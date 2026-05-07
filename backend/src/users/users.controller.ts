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

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
