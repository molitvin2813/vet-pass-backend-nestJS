import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/models/user.model';
import { Role } from './userEnum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const temp = String(authorization).split(' ');
    const ss: AuthPayload = this.jwtService.decode(temp[1]) as AuthPayload;
    //const { is_admin } = context.switchToHttp().getRequest().headers;
    if (ss?.role == null) return false;
    return requireRoles.some((value) => value == ss.role);
  }
}
