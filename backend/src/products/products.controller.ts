import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductEntity } from './entities/product.entity';
import { TransformInterceptor } from '../transform.interceptor';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(dto);
  }
}
