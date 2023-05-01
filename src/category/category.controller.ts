import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { ApiOperations } from "src/phrases/swagger.phrases"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { QueryPipe } from "src/core/query-options/query-options.pipe"

@ApiTags("Категории")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: ApiOperations.create })
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto)
  }

  @ApiOperation({ summary: ApiOperations.getAll })
  @Get()
  async findAll(@Query(QueryPipe) opts?: QueryDto) {
    return await this.categoryService.findAll(opts)
  }

  @ApiOperation({ summary: ApiOperations.getOneById })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query(QueryPipe) opts?: QueryDto
  ) {
    return await this.categoryService.findOne(id, opts)
  }

  @ApiOperation({ summary: ApiOperations.deleteOneById })
  @Delete(":id")
  async deleteOne(
    @Param("id", ParseIntPipe) id: number,
    @Query(QueryPipe) opts?: QueryDto
  ) {
    return await this.categoryService.deleteOne(id, opts)
  }
}
