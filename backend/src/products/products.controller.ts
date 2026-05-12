import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseIntPipe
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductEntity } from './entities/product.entity';
import { TransformInterceptor } from '../transform.interceptor';

@Controller('products')
@ApiTags('products')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  async remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ productRemoved: boolean }> {
    return this.productsService.remove(id);
  }
}
