import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientEntity } from './entity/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(private readonly prisma: PrismaService) {}

    private customerSelect = {
        id: true,
        name: true,
        email: true,
        phone: true,
        orders: true
    };

    async findAll(): Promise<ClientEntity[]> {
        return await this.prisma.client.findMany({
            where: { deletedAt: null },
            select: this.customerSelect
        });
    }

    async findOne(id: number): Promise<ClientEntity> {
        const client = await this.prisma.client.findFirst({
            where: { id, deletedAt: null },
            select: this.customerSelect
        });

        if (!client) {
            throw new NotFoundException('Cliente não encontrado.');
        }

        return client;
    }

    async create(dto: CreateClientDto): Promise<ClientEntity> {
        return await this.prisma.client.create({
            data: { ...dto },
            select: this.customerSelect
        });
    }

    async update(id: number, dto: UpdateClientDto): Promise<ClientEntity> {
        const client = await this.findOne(id);

        return await this.prisma.client.update({
            where: { id: client.id },
            data: { ...dto }
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
