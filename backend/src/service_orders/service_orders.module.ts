import { Module } from '@nestjs/common';
import { ServiceOrdersService } from './service_orders.service';
import { ServiceOrdersController } from './service_orders.controller';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { OrderProductsHelper } from './helpers/order-products.helper';
import { OrderCalculatorHelper } from './helpers/order-calculator.helper';
import { OrderItemsHelper } from './helpers/order-items.helper';
import { OrderStockHelper } from './helpers/order-stock.helper';
import { OrderHelper } from './helpers/order.helper';

@Module({
  controllers: [ServiceOrdersController],
  providers: [
    ServiceOrdersService,
    ClientsService,
    ProductsService,
    OrderProductsHelper,
    OrderCalculatorHelper,
    OrderItemsHelper,
    OrderStockHelper,
    OrderHelper
  ],
})
export class ServiceOrdersModule {}
