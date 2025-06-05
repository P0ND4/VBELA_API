import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import { Permissions } from 'src/contexts/users/domain/types';
import { REQUIRED_PERMISSIONS_KEY } from '../decorators/required-permissions.decorator';
import { Token } from 'src/contexts/users/domain/token.entity';

@Injectable()
export class PermissionAccessTokenGuard extends AccessTokenGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: Token, info: any, context?: ExecutionContext) {
    // Primero ejecuta la validación original del padre
    const validatedUser = super.handleRequest(err, user, info);

    // Si no hay contexto (por compatibilidad), retorna sin validar permisos
    if (!context) return validatedUser;

    // Lógica de permisos
    if (user.permissions === null) return validatedUser;

    // Obtiene permisos de la CLASE (controlador)
    const classPermissions = this.reflector.get<{
      permissions: Array<keyof Permissions>;
      inherit: boolean;
    }>(REQUIRED_PERMISSIONS_KEY, context.getClass());

    // Obtiene permisos del MÉTODO (ruta)
    const methodPermissions = this.reflector.get<{
      permissions: Array<keyof Permissions>;
      inherit: boolean;
    }>(REQUIRED_PERMISSIONS_KEY, context.getHandler());

    // Combina permisos según configuración
    let requiredPermissions: Array<keyof Permissions> = [];

    if (classPermissions) {
      requiredPermissions = [...classPermissions.permissions];

      // Si el método tiene permisos y se permite heredar
      if (methodPermissions && classPermissions.inherit) {
        requiredPermissions.push(...methodPermissions.permissions);
      }
    } else if (methodPermissions) {
      requiredPermissions = [...methodPermissions.permissions];
    }

    // Validación de permisos
    if (requiredPermissions.length > 0) {
      const missingPermissions = requiredPermissions.filter(
        (p) => !user.permissions?.[p],
      );

      if (missingPermissions.length > 0) {
        throw new UnauthorizedException(
          `Requiere permisos: ${missingPermissions.join(', ')}`,
        );
      }
    }

    return validatedUser;
  }
}
