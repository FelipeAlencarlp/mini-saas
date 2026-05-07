import {
    Controller,
    Body,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { TransformInterceptor } from '../transform.interceptor';
import { LoginDto } from './dto/login.dto';
import { User } from '../generated/prisma/client';
import { UsersService } from '../users/users.service';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    async register(@Body() dto: RegisterUserDto): Promise<User> {
        return this.usersService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto): Promise<any> {
        return this.authService.login(dto);
    }

    @Post('refresh')
    async refresh(@Body() body: any) {
        const { refreshToken } = body;
        return this.authService.refresh(refreshToken);
    }
}
