import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../transform.interceptor';
import { ProductDashboardEntity } from './entity/product-dashboard.entity';
import { ClientDashboardEntity } from './entity/client-dashboard.entity';

@Controller('dashboard')
@ApiTags('dashboard')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-orders')
  @ApiOkResponse({ type: Number })
  async total(): Promise<number> {
    return this.dashboardService.total();
  }

  @Get('total-ended-orders')
  @ApiOkResponse({ type: Object })
  async totalEndedOrders(): Promise<{ totalEnded: number }> {
    return this.dashboardService.totalEndedOrders();
  }

  @Get('total-sold-orders')
  @ApiOkResponse({ type: Number })
  async totalSold(): Promise<{ valueTotalSold: number }> {
    return this.dashboardService.totalSold();
  }

  @Get('product-most-sold')
  @ApiOkResponse({ type: ProductDashboardEntity })
  async productMostSold(): Promise<ProductDashboardEntity> {
    return this.dashboardService.productMostSold();
  }

  @Get('client-most-orders')
  @ApiOkResponse({ type: ClientDashboardEntity })
  async clientMostOrders(): Promise<ClientDashboardEntity> {
    return this.dashboardService.clientMostOrders();
  }
}
