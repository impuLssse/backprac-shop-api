import { ApiOperations } from "./../phrases/swagger.phrases"
import { CreateProductDto } from "./dto/create-product.dto"
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common"
import { Product } from "@prisma/client"
import { ProductService } from "./product.service"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { QueryPipe } from "src/core/query-options/query-options.pipe"

@ApiTags("Продукты")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: ApiOperations.create })
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.create(dto)
  }

  @ApiOperation({ summary: ApiOperations.getAll })
  @Get()
  async get(@Query(QueryPipe) opts?: QueryDto): Promise<Product[]> {
    return await this.productService.findAll(opts)
  }

  @ApiOperation({ summary: ApiOperations.getOneById })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query(QueryPipe) opts?: QueryDto
  ): Promise<Product> {
    return await this.productService.findOne(id, opts)
  }

  @ApiOperation({ summary: ApiOperations.deleteOneById })
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.delete(id)
  }
}
