import { Injectable } from '@nestjs/common';
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

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const resultado = await this.prisma.product.create({
      data: { ...dto },
      select: this.customerSelect
    });

    return this.productMapper(resultado);
  }
}
