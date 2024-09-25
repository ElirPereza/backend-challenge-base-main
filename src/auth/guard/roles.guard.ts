import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../../common/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {


  constructor(private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {


    const role = this.reflector.getAllAndOverride<Role>('roles', [
      context.getHandler(),
      context.getClass(),
    ])


    if (!role) {
      return true
    }

    const {user} = context.switchToHttp().getRequest();


    if (user.role === Role.ADMIN) {
      return true
    }


    return role === user.role
  }
}
