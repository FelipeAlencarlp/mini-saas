import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private customerSelect = {
    id: true,
    name: true,
    price: true,
    quantity: true
  }

  private productMapper(product: any): ProductEntity {
    return {
      ...product,
      price: product.price.toNumber()
    };
  }

  async findAll(): Promise<ProductEntity[]> {
    const resultado = await this.prisma.product.findMany({
      where: {
        quantity: { gt: 0 },
        deletedAt: null
      },
      select: this.customerSelect,
      orderBy: { id: 'asc' }
    });

    return resultado.map(product => this.productMapper(product));
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        quantity: { gt: 0 },
        deletedAt: null
      },
      select: this.customerSelect
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return this.productMapper(product);
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
      select: this.customerSelect
    });

    const idsExist = new Set(products.map(p => p.id));
    const invalidIds = ids.filter(id => !idsExist.has(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `O(s) Produto(s) com ID(s) ${invalidIds.join(', ')} não existe(m).`
      );
    }

    return products.map(product => this.productMapper(product));
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const resultado = await this.prisma.product.create({
      data: { ...dto },
      select: this.customerSelect
    });

    return this.productMapper(resultado);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);

    const resultado = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        ...dto,
        updatedAt: new Date()
      },
      select: this.customerSelect
    });

    return this.productMapper(resultado);
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
