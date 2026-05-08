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
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../auth/entity/user.entity';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(
        @CurrentUser() user: CurrentUserDto
    ): Promise<UserEntity[]> {
        console.log(user);
        return this.usersService.findAll();
    }
}
