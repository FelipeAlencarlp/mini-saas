import { Module } from '@nestjs/common';
import { ServiceOrdersService } from './service_orders.service';
import { ServiceOrdersController } from './service_orders.controller';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [ServiceOrdersController],
  providers: [
    ServiceOrdersService,
    ClientsService,
    ProductsService
  ],
})
export class ServiceOrdersModule {}
