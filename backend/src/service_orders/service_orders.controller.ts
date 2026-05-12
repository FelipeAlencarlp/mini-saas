import { Controller, Post, Body, UseInterceptors, UseGuards, Patch, ParseIntPipe, Param, Get } from '@nestjs/common';
import { ServiceOrdersService } from './service_orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../transform.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Controller('service-orders')
@ApiTags('service-orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Get()
  @ApiOkResponse({ type: ServiceOrderEntity, isArray: true })
  async findAll(): Promise<ServiceOrderEntity[]> {
    return this.serviceOrdersService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: ServiceOrderEntity })
  async create(
    @CurrentUser() user: CurrentUserDto,
    @Body() dto: CreateOrderDto
  ): Promise<ServiceOrderEntity> {
    return this.serviceOrdersService.create(user, dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Boolean })
  async endOrder(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ endedOrder: boolean }> {
    return this.serviceOrdersService.endOrder(id);
  }
}
