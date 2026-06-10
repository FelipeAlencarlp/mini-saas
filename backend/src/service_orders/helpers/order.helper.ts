import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class OrderHelper {
    async createOrder(
        tx: Prisma.TransactionClient,
        userId: number,
        clientId: number,
        total: number
    ) {
        return tx.serviceOrder.create({
            data: {
                userId,
                clientId,
                status: 'Iniciado',
                total: new Prisma.Decimal(total)
            }
        });
    }
}