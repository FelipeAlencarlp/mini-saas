import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwt: JwtService
    ) {}
    async validateUser(user: LoginDto): Promise<any> {
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

    async login(userReq: any): Promise<{ access_token: string }> {
        const user = await this.validateUser(userReq);
        const payload = { sub: user.id, email: user.email };

        return { access_token: await this.jwt.signAsync(payload) };
    }
}
