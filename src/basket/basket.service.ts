import { BasketRepository } from "src/basket/basket.repository"
import { Injectable } from "@nestjs/common"
import { Basket } from "@prisma/client"
import { UpdateBasketDto } from "./dto/update-basket.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"

@Injectable()
export class BasketService {
  constructor(private readonly basketRepository: BasketRepository) {}

  async create(userId: number, opts?: QueryDto) {
    return await this.basketRepository.create(userId, opts)
  }

  async updateOne(userId: number, dto: UpdateBasketDto, opts?: QueryDto) {
    return await this.basketRepository.updateOne(userId, dto, opts)
  }

  async findAll(opts?: QueryDto): Promise<Basket[]> {
    return await this.findAll(opts)
  }

  async findOne(userId: number, opts?: QueryDto): Promise<Basket> {
    return await this.basketRepository.findOne(userId, opts)
  }
}
