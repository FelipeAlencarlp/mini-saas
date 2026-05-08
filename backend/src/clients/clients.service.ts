import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientEntity } from './entity/client.entity';

@Injectable()
export class ClientsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<ClientEntity[]> {
        return await this.prisma.client.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true
            }
        });
    }
}
