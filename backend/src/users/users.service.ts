import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../auth/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    private customerSelect = {
        id: true,
        name: true,
        email: true,
        orders: true
    };

    async findAll(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany({
            where: { deletedAt: null },
            select: this.customerSelect,
            orderBy: { id: 'asc' }
        });
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

    async create(dto: RegisterUserDto): Promise<UserEntity> {
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
}
