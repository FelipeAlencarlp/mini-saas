import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientEntity } from './entity/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginatedResult } from '../common/types/paginated-result.type';
import { paginate } from '../common/paginate/paginate';
import { customerSelect } from './helpers/client.select';

@Injectable()
export class ClientsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(
        page: string, limit: string
    ): Promise<PaginatedResult<ClientEntity>> {
        return paginate(
            this.prisma.client,
            { page, limit },
            {
                select: customerSelect,
                orderBy: { id: 'asc' }
            }
        );
    }

    async findOne(id: number): Promise<ClientEntity> {
        const client = await this.prisma.client.findFirst({
            where: { id, deletedAt: null },
            select: customerSelect
        });

        if (!client) {
            throw new NotFoundException('Cliente não encontrado.');
        }

        return client;
    }

    async create(dto: CreateClientDto): Promise<ClientEntity> {
        return await this.prisma.client.create({
            data: { ...dto },
            select: customerSelect
        });
    }

    async update(id: number, dto: UpdateClientDto): Promise<ClientEntity> {
        const client = await this.findOne(id);

        return await this.prisma.client.update({
            where: { id: client.id },
            data: { 
                ...dto,
                updatedAt: new Date()
            }
        });
    }

    async remove(id: number): Promise<{ clientRemoved: boolean }> {
        const client = await this.findOne(id);

        await this.prisma.client.update({
            where: { id: client.id },
            data: { deletedAt: new Date() }
        });

        return { clientRemoved: true };
    }

    async restore(id: number): Promise<{ clientRestored: boolean }> {
        const client = await this.findOne(id);

        await this.prisma.client.update({
            where: { id: client.id },
            data: { deletedAt: null }
        });

        return { clientRestored: true };
    }
}
