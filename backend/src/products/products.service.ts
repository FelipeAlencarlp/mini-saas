import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { ProductEntity } from './entities/product.entity';
import { paginate } from '../common/paginate/paginate';
import { PaginatedResult } from '../common/types/paginated-result.type';
import { customerSelect } from './helpers/product.select';
import { productMapper } from './helpers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: string, limit: string
  ): Promise<PaginatedResult<ProductEntity>> {
    const pagination = await paginate<ProductEntity>(
      this.prisma.product,
      { page, limit },
      {
        where: { 
          quantity: { gt: 0 },
          deletedAt: null
        },
        select: customerSelect,
        orderBy: { id: 'asc' }
      }
    );

    return {
      ...pagination,
      data: pagination.data.map(
        product => productMapper(product)
      )
    };
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        quantity: { gt: 0 },
        deletedAt: null
      },
      select: customerSelect
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return productMapper(product);
  }

  async findProducts(ids: number[]): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids
        },
        quantity: { gt: 0 }, // traz apenas maior que 0
        deletedAt: null
      },
      select: customerSelect
    });

    const idsExist = new Set(products.map(p => p.id));
    const invalidIds = ids.filter(id => !idsExist.has(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `O(s) Produto(s) com ID(s) ${invalidIds.join(', ')} não existe(m).`
      );
    }

    return products.map(product => productMapper(product));
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const resultado = await this.prisma.product.create({
      data: { ...dto },
      select: customerSelect
    });

    return productMapper(resultado);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);

    const resultado = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        ...dto,
        updatedAt: new Date()
      },
      select: customerSelect
    });

    return productMapper(resultado);
  }

  async remove(id: number): Promise<{ productRemoved: boolean }> {
    const product = await this.findOne(id);

    await this.prisma.product.update({
      where: { id: product.id },
      data: { deletedAt: new Date() }
    });

    return { productRemoved: true };
  }
}
