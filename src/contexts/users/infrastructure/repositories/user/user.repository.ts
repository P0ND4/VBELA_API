import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';
import { Permissions } from 'src/contexts/users/domain/types';
import { ValidationEvents } from 'src/contexts/users/infrastructure/repositories/common/validation.events';
import { permissionMap } from '../../constants/permission.constants';

@Injectable()
export class UserRepository extends UserRepositoryEntity {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private validationEvents: ValidationEvents,
  ) {
    super();
  }

  async getUserInformation(
    identifier: string,
    selected: string,
    permissions: Permissions | null,
  ): Promise<ApiResponse<Partial<PrimitiveUser>>> {
    if (identifier !== selected && !permissions) {
      throw new UnauthorizedException(
        'No tiene permisos para ver este usuario',
      );
    }

    const user = await this.validationEvents.validate(identifier, selected);

    if (identifier === selected)
      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Usuario obtenido.',
        { ...user, selected, permissions },
      );

    // Construcción del objeto colaborator basado en permisos
    const collaborator = Object.entries(permissionMap).reduce(
      (acc, [permission, fields]) => {
        if (permissions[permission]) {
          fields.forEach((field) => {
            acc[field] = user[field];
          });
        }
        return acc;
      },
      {},
    );

    // Agrega como identificador el colaborador y no la cuenta principal
    collaborator['identifier'] = identifier;

    // Enviamos los permisos para limitar al colaborador
    collaborator['permissions'] = permissions;

    // Enviamos la cuenta que ha seleccionado el usuario
    collaborator['selected'] = selected;

    // Campos compartidos que requieren múltiples condiciones
    const sharedFields = ['invoiceInformation', 'paymentMethods', 'tip', 'tax'];

    // Añadir campos compartidos si cumple alguna condición
    if (permissions.accessToRestaurant || permissions.accessToStore) {
      sharedFields.forEach((field) => {
        if (!collaborator[field]) collaborator[field] = user[field];
      });
    }

    return new ApiResponse(
      Status.Success,
      HttpStatus.OK,
      'Información de cuenta de colaborador obtenido.',
      collaborator,
    );
  }

  async findAndDeleteUserByIdentifier(
    identifier: string,
  ): Promise<ApiResponse<PrimitiveUser | null>> {
    const user = await this.userModel.findOneAndDelete({ identifier }).exec();

    return new ApiResponse(
      user ? Status.Success : Status.Error,
      user ? HttpStatus.OK : HttpStatus.NO_CONTENT,
      user ? 'Usuario eliminado' : 'Usuario no encontrado',
      user ? UserEntity.transform(user).toPrimitives() : null,
    );
  }
}
