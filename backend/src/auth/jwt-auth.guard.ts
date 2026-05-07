import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService) {}

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token não fornecido.');
        }

        try {
            const payload = await this.jwt.verifyAsync(token);
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Token inválido ou expirado.');
        }

        return true;
    }

    private extractTokenHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}