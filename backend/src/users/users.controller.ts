import {
    Controller,
    UseGuards,
    UseInterceptors,
    Get,
    Post,
    Body,
    Query,
    Param,
    ParseIntPipe,
    Patch,
    Delete
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../auth/entity/user.entity';
import { TransformInterceptor } from '../transform.interceptor';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginatedResult } from '../common/types/paginated-result.type';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('user')
    @ApiOkResponse()
    async user(
        @CurrentUser() user: UserDto
    ): Promise<UserEntity> {
        return user;
    }

    @Get('users')
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('filter') filter?: string
    ): Promise<PaginatedResult<UserEntity>> {
        return this.usersService.findAll(page, limit, filter);
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<UserEntity> {
        return this.usersService.findOne(id);
    }

    @Get()
    @ApiOkResponse({ type: UserEntity })
    async findOneByEmail(
        @Query('email') email: string
    ): Promise<UserEntity> {
        return this.usersService.findOneByEmail(email);
    }

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async register(
        @Body() dto: CreateUserDto
    ): Promise<UserEntity> {
        return this.usersService.create(dto);
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserEntity })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto
    ): Promise<UserEntity> {
        return this.usersService.update(id, dto)
    }

    @Delete(':id')
    @ApiOkResponse({ type: Boolean })
    async remove(
        @Param('id', ParseIntPipe) id: number
    ): Promise<{ userRemoved: boolean }>  {
        return this.usersService.remove(id);
    }
}
