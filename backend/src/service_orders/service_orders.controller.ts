import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ServiceOrdersService } from './service_orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ServiceOrderEntity } from './entity/service-order.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../transform.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { PaginatedResult } from '../common/types/paginated-result.type';

@Controller('service-orders')
@ApiTags('service-orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Get()
  @ApiOkResponse({ type: ServiceOrderEntity, isArray: true })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filter') filter?: string
  ): Promise<PaginatedResult<ServiceOrderEntity>> {
    return this.serviceOrdersService.findAll(page, limit, filter);
  }

  @Post()
  @ApiCreatedResponse({ type: ServiceOrderEntity })
  async create(
    @CurrentUser() user: CurrentUserDto,
    @Body() dto: CreateOrderDto
  ): Promise<ServiceOrderEntity> {
    return this.serviceOrdersService.create(user, dto);
  }

  @Patch('end-order/:id')
  @ApiOkResponse({ type: Boolean })
  async endOrder(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ endedOrder: boolean }> {
    return this.serviceOrdersService.endOrder(id);
  }

  @Patch('cancel-order/:id')
  @ApiOkResponse({ type: Boolean })
  async cancelOrder(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ canceledOrder: boolean }> {
    return this.serviceOrdersService.cancelOrder(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  async remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ serviceOrderRemoved: boolean }> {
    return this.serviceOrdersService.remove(id);
  }
}
