import {
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

interface MinhaObj { value: string };
const refreshTokens: MinhaObj[] = [];

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwt: JwtService
    ) {}

    private async validateUser(user: LoginDto) {
        const validUser = await this.usersService.findOneByEmail(user.email);

        if (!validUser) {
            throw new UnauthorizedException('Credênciais inválidas');
        }

        const isMatch = await bcrypt.compare(
            user.password, validUser?.password
        );

        if (!isMatch) {
            throw new UnauthorizedException('Credênciais inválidas');
        }

        return validUser;
    }

    private token(payload: any) {
        const { exp, iat, nbf, ...cleanPayload } = payload;

        const accessToken = this.jwt.sign(
            { ...cleanPayload, type: 'access' },
            { expiresIn: '15m' }
        );

        const refreshToken = this.jwt.sign(
            { ...cleanPayload, type: 'refresh' },
            { expiresIn: '1h' }
        );

        const index = refreshTokens.findIndex(
            (token) => token.value === refreshToken
        );

        refreshTokens.splice(index, 1);
        refreshTokens.push({ value: refreshToken });

        return { accessToken, refreshToken };
    }

    async login(userReq: any): Promise<AuthEntity> {
        const user = await this.validateUser(userReq);
        const payload = {
            sub: user.id,
            username: user.name,
            useremail: user.email
        };

        return this.token(payload);
    }

    async refresh(refreshToken: string): Promise<AuthEntity> {
        const storedToken = refreshTokens.find(
            (token) => token.value === refreshToken,
        );

        if (!storedToken) {
            throw new UnauthorizedException('Refresh token inválido.');
        }

        const payload = await this.jwt.verify(refreshToken);

        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Tipo de token invalido.');
        }

        const user = await this.usersService.findOneByEmail(payload.useremail);

        if (!user) {
            throw new UnauthorizedException('Refresh token inválido.');
        }

        return this.token(payload);
    }

    async logout(refreshToken: string): Promise<{ loggedOut: boolean }> {
        const tokenIndex = refreshTokens.findIndex(
            (token) => token.value === refreshToken
        );

        if (tokenIndex === -1) {
            throw new UnauthorizedException('Refresh token inválido.');
        }

        refreshTokens.splice(tokenIndex, 1);

        return { loggedOut: true };
    }
}
