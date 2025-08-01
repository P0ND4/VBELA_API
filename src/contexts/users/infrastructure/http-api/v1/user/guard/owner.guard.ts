import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenGuard } from '../../../../../../shared/guards/access-token.guard';
import { Token } from 'src/contexts/users/domain/token.entity';

@Injectable()
export class OwnerGuard extends AccessTokenGuard {
  handleRequest(err: any, user: Token, info: any, context?: ExecutionContext) {
    // Validación original del token
    const validatedUser = super.handleRequest(err, user, info);
    
    // Validar si es usuario principal
    if (user.identifier !== user.selected) {
      throw new UnauthorizedException('Solo el usuario principal puede realizar esta acción');
    }

    // Si pasa todas las validaciones, retornar el usuario
    return validatedUser;
  }
}