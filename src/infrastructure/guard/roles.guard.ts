import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { PayloadToken } from 'src/domain/contracts/token.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAllowed = roles.some((role) => role === user.role);

    if (!isAllowed) {
      throw new ForbiddenException('Tu rol no tiene acceso');
    }

    return true;
  }
}
