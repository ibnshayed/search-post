import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators';
import { PermissionEnum } from '../enums';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPermissions.some(
      (permission) => user.permissions?.includes(permission),
    );
  }
}
