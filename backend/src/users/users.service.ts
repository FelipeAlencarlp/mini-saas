import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../generated/prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany({
            where: { deletedAt: null }
        });
    }

    async findOneByEmail(email: string): Promise<any> {
        return await this.prisma.user.findFirst({
            where: { email, deletedAt: null }
        });
    }

    async create(dto: RegisterUserDto): Promise<User> {
        dto.password = await bcrypt.hash(dto.password, 10);

        return await this.prisma.user.create({
            data: { ...dto }
        });
    }
}
