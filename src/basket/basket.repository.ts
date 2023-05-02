import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { Basket } from "@prisma/client"
import { UpdateBasketDto } from "./dto/update-basket.dto"

@Injectable()
export class BasketRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number) {
    return await this.databaseService.basket.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async findAll(opts?: QueryDto): Promise<Basket[]> {
    return await this.databaseService.basket.findMany({
      include: {
        user: opts.include.get("user"),
        products: {
          include: {
            category: opts.include.get("category"),
            urls: opts.include.get("urls"),
          },
        },
      },
    })
  }

  async findOne(userId: number, opts?: QueryDto): Promise<Basket> {
    return await this.databaseService.basket.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            category: opts.include.get("category"),
            urls: opts.include.get("urls"),
          },
        },
      },
    })
  }

  async updateOne(userId: number, dto: UpdateBasketDto, opts?: QueryDto) {
    return await this.databaseService.basket.update({
      where: { userId },
      data: {
        products: {
          set: dto.products
            .filter(Boolean)
            .map((productId) => ({ id: productId })),
        },
      },
      include: {
        products: {
          include: {
            category: opts.include.get("category"),
            urls: opts.include.get("urls"),
          },
        },
      },
    })
  }
}
