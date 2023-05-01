import { Controller, Get, Patch, Param, Query, Body } from "@nestjs/common"
import { BasketService } from "./basket.service"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { ApiOperations } from "src/phrases/swagger.phrases"
import { UpdateBasketDto } from "./dto/update-basket.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { QueryPipe } from "src/core/query-options/query-options.pipe"

@ApiTags("Корзина")
@Controller("basket")
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: ApiOperations.getAll })
  @Get()
  async findAll(@Query(QueryPipe) opts?: QueryDto) {
    return await this.basketService.findAll(opts)
  }

  @ApiOperation({ summary: ApiOperations.updateOneById })
  @Patch(":id")
  async updateOne(
    @Param("id") id: number,
    @Body() dto: UpdateBasketDto,
    @Query(QueryPipe) opts?: QueryDto
  ) {
    return await this.basketService.updateOne(
      id,
      { products: dto.products },
      opts
    )
  }

  @ApiOperation({ summary: ApiOperations.getOneById })
  @Get(":id")
  async findOne(@Param("id") id: number, @Query(QueryPipe) opts?: QueryDto) {
    return await this.basketService.findOne(id, opts)
  }
}
