import {
    Controller,
    Body,
    Post,
    UseInterceptors,
    UseGuards
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { TransformInterceptor } from '../transform.interceptor';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthEntity } from './entity/auth.entity';
import { UserEntity } from './entity/user.entity';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('register')
    @ApiCreatedResponse({ type: UserEntity })
    async register(@Body() dto: RegisterUserDto): Promise<UserEntity> {
        return this.usersService.create(dto);
    }

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    async login(@Body() dto: LoginDto): Promise<AuthEntity> {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOkResponse({ type: AuthEntity })
    async refresh(
        @Body() dto: RefreshTokenDto
    ): Promise<AuthEntity> {
        return this.authService.refresh(dto.refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @ApiOkResponse()
    async logout(
        @Body() dto: RefreshTokenDto
    ): Promise<{ loggedOut: boolean }> {
        return this.authService.logout(dto.refreshToken);
    }
}
