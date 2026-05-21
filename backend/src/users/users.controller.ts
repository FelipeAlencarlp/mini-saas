import {
    Controller,
    UseGuards,
    UseInterceptors,
    Get
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../transform.interceptor';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../auth/entity/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('user')
    @ApiOkResponse()
    async user(@CurrentUser() user: UserDto): Promise<UserEntity> {
        return user;
    }

    @Get()
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(): Promise<UserEntity[]> {
        
        return this.usersService.findAll();
    }
}
