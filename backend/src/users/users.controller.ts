import {
    Controller,
    UseGuards,
    UseInterceptors,
    Get
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../transform.interceptor';
import { UsersService } from './users.service';
import { User } from '../generated/prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(@CurrentUser() user: CurrentUserDto): Promise<User[]> {
        console.log(user);
        return this.usersService.findAll();
    }
}
