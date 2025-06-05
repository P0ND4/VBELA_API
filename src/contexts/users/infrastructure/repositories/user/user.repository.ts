import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrimitiveUser, UserEntity } from '../../../domain/user.entity';
import { User } from '../../schema/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryEntity } from 'src/contexts/users/domain/repositories/user/user.repository.entity';
import { ApiResponse, Status } from 'src/contexts/shared/api.response';
import { Permissions } from 'src/contexts/users/domain/types';

@Injectable()
export class UserRepository extends UserRepositoryEntity {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super();
  }

  private async validate(identifier: string): Promise<PrimitiveUser> {
    const existingUser = await this.userModel.findOne({ identifier }).exec();

    if (existingUser) return UserEntity.transform(existingUser).toPrimitives();

    const newUser = new this.userModel({ identifier });
    const savedUser = await newUser.save();

    return UserEntity.transform(savedUser).toPrimitives();
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

    const user = await this.validate(selected);
    const userPrimitives = UserEntity.transform(user).toPrimitives();

    if (identifier === selected)
      return new ApiResponse(
        Status.Success,
        HttpStatus.OK,
        'Usuario obtenido.',
        userPrimitives,
      );

    // Mapeo completo de permisos a campos
    const permissionMap = {
      accessToInventory: [
        'stocks',
        'stockGroup',
        'inventories',
        'recipes',
        'recipeGroup',
        'movements',
        'portions',
        'portionGroup',
      ],
      accessToStore: ['stores', 'productGroup', 'products', 'sales'],
      accessToKitchen: ['kitchens'],
      accessToRestaurant: [
        'restaurants',
        'menuGroup',
        'menu',
        'orders',
        'tables',
      ],
      accessToEconomy: ['economies', 'economicGroup'],
      accessToSupplier: ['suppliers'],
      accessToCollaborator: ['collaborators'],
      accessToStatistics: ['initialBasis', 'handlers'],
    };

    // Construcción del objeto colaborator basado en permisos
    const collaborator = Object.entries(permissionMap).reduce(
      (acc, [permission, fields]) => {
        if (permissions[permission]) {
          fields.forEach((field) => {
            acc[field] = userPrimitives[field];
          });
        }
        return acc;
      },
      {},
    );

    // Campos compartidos que requieren múltiples condiciones
    const sharedFields = ['invoiceInformation', 'paymentMethods', 'tip', 'tax'];

    // Añadir campos compartidos si cumple alguna condición
    if (permissions.accessToRestaurant || permissions.accessToStore) {
      sharedFields.forEach((field) => {
        if (!collaborator[field]) collaborator[field] = userPrimitives[field];
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
