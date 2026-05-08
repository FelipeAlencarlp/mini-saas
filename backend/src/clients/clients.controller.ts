import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../transform.interceptor';
import { ClientsService } from './clients.service';
import { ClientEntity } from './entity/client.entity';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('clients')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOkResponse({ type: ClientEntity, isArray: true })
    async findAll(): Promise<ClientEntity[]> {
        return this.clientsService.findAll();
    }
}
