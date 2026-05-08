import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../auth/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany({
            where: { deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    async findOneByEmail(email: string): Promise<any> {
        return await this.prisma.user.findFirst({
            where: { email, deletedAt: null }
        });
    }

    async create(dto: RegisterUserDto): Promise<UserEntity> {
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
