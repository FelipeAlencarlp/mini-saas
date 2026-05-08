import { Injectable, NotFoundException } from '@nestjs/common';
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
      where: { deletedAt: null },
      select: this.customerSelect
    });

    return resultado.map(this.productMapper);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      select: this.customerSelect
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return this.productMapper(product);
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
      data: { ...dto },
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
