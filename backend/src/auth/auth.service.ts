import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
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
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const isMatch = await bcrypt.compare(
            user.password, validUser?.password
        );

        if (!isMatch) {
            throw new UnauthorizedException('Senha incorreta.');
        }

        return validUser;
    }

    private token(payload: any) {
        const { exp, iat, nbf, ...cleanPayload } = payload;

        const accessToken = this.jwt.sign(
            { ...cleanPayload, type: 'access' },
            { expiresIn: '60s' }
        );

        const refreshToken = this.jwt.sign(
            { ...cleanPayload, type: 'refresh' },
            { expiresIn: '1h' }
        );

        refreshTokens.push({ value: refreshToken });

        return { accessToken, refreshToken };
    }

    async login(userReq: any) {
        const user = await this.validateUser(userReq);
        const payload = { username: user.email, sub: user.id };

        return this.token(payload);
    }

    async refresh(refreshToken: string) {
        const storedToken = refreshTokens.find(
            (token) => token.value === refreshToken,
        );

        if (!storedToken) {
            throw new UnauthorizedException('Refresh token inválido.');
        }

        const payload = this.jwt.verify(refreshToken);

        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Tipo de token invalido.');
        }

        const user = this.usersService.findOneByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('Refresh token inválido.');
        }

        return this.token(payload);
    }
}
