import {
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paginate } from '../common/paginate/paginate';
import { UserEntity } from '../auth/entity/user.entity';
import { PaginatedResult } from '../common/types/paginated-result.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    private customerSelect = {
        id: true,
        name: true,
        email: true,
        orders: true,
        createdAt: true,
        updatedAt: true
    };

    async findAll(
        page: string,
        limit: string,
        filter?: string
    ): Promise<PaginatedResult<UserEntity>> {
        const where = filter
            ? {
                name: { contains: filter, mode: 'insensitive' },
                deletedAt: null
                }
            : { deletedAt: null };

        return paginate(
            this.prisma.user,
            { page, limit },
            {
                where,
                select: this.customerSelect,
                orderBy: { createdAt: 'desc' }
            }
        );
    }

    async findOneByEmail(email: string): Promise<any> {
        return await this.prisma.user.findFirst({
            where: { email, deletedAt: null }
        });
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.prisma.user.findFirst({
            where: { id, deletedAt: null },
            select: this.customerSelect
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return user;
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const emailExists = await this.findOneByEmail(dto.email);

        if (emailExists) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        dto.password = await bcrypt.hash(dto.password, 10);

        return await this.prisma.user.create({
            data: { ...dto },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    async update(
        id: number,
        dto: UpdateUserDto
    ): Promise<UserEntity> {
        const user = await this.findOne(id);

        return await this.prisma.user.update({
            where: { id: user.id },
            data: { 
                ...dto,
                updatedAt: new Date()
            }
        });
    }

    async remove(id: number): Promise<{ userRemoved: boolean }> {
        const user = await this.findOne(id);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { deletedAt: new Date() }
        });

        return { userRemoved: true };
    }

    async restore(id: number): Promise<{ userRestored: boolean }> {
        const user = await this.findOne(id);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { deletedAt: null }
        });

        return { userRestored: true };
    }
}
