import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '../prisma.service';
import { ProductsService } from '../products/products.service';
import { ClientsService } from '../clients/clients.service';

@Module({
  controllers: [DashboardController],
  providers: [
    PrismaService,
    DashboardService,
    ProductsService,
    ClientsService
  ],
})
export class DashboardModule {}
