import {
    Controller,
    Body,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
    Query
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../transform.interceptor';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entity/client.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginatedResult } from '../common/types/paginated-result.type';

@Controller('clients')
@ApiTags('clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    @ApiOkResponse({ type: ClientEntity, isArray: true })
    async findAll(
        @Query('page') page: string,
        @Query('limit') limit: string
    ): Promise<PaginatedResult<ClientEntity>> {
        return this.clientsService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOkResponse({ type: ClientEntity })
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ClientEntity> {
        return this.clientsService.findOne(id);
    } 

    @Post()
    @ApiCreatedResponse({ type: ClientEntity })
    async create(
        @Body() dto: CreateClientDto
    ): Promise<ClientEntity> {
        return this.clientsService.create(dto);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ClientEntity })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateClientDto
    ): Promise<ClientEntity> {
        return this.clientsService.update(id, dto)
    }

    @Delete(':id')
    @ApiOkResponse({ type: Boolean })
    async remove(
        @Param('id', ParseIntPipe) id: number
    ): Promise<{ clientRemoved: boolean }>  {
        return this.clientsService.remove(id);
    }
}
