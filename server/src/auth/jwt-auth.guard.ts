import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req= context.switchToHttp().getRequest()
        const [bearer, token] = req.headers.authorization?.split(' ') ?? []

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'User not authorization'})
        }
        try {
            const {user} = this.authService.verifyToken(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'User not authorization'})
        }
    }
}