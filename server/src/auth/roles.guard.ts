import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";
import {AuthService} from "./auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private authService: AuthService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const [bearer, token] = req.headers.authorization?.split(' ') ?? [];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User not authorization'})
            }
            const user = this.authService.verifyToken(token);
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN)
        }
    }

}