import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { BasketRepository } from "src/basket/basket.repository"

@Injectable()
export class UserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly basketRepository: BasketRepository
  ) {}

  async create(dto: CreateUserDto) {
    return await this.databaseService.user
      .create({ data: dto })

      .then(async (user) => {
        try {
          const basket = await this.basketRepository.create(user.id)
          return { ...user, basket }
        } catch (e) {
          console.log(e)
        }
      })
  }

  async findAll(opts?: QueryDto) {
    return await this.databaseService.user.findMany({
      include: {
        basket: opts.include.get("basket")
          ? {
              include: {
                products: {
                  include: {
                    urls: opts.include.get("urls"),
                    category: opts.include.get("category"),
                  },
                },
              },
            }
          : false,
      },
    })
  }

  async findOne(id: number, opts?: QueryDto) {
    return await this.databaseService.user.findUnique({
      where: { id },
      include: {
        basket: opts.include.get("basket")
          ? {
              include: {
                products: {
                  include: {
                    category: opts.include.get("category"),
                    urls: opts.include.get("urls"),
                  },
                },
              },
            }
          : false,
      },
    })
  }

  async update(id: number, dtoUpdate: UpdateUserDto, opts?: QueryDto) {
    console.log(opts)
    return await this.databaseService.user.update({
      where: { id },
      data: dtoUpdate,
      include: {
        basket: opts.include.get("basket")
          ? {
              include: {
                products: opts.include.get("products")
                  ? {
                      include: {
                        category: opts.include.get("category"),
                        urls: opts.include.get("urls"),
                      },
                    }
                  : false,
              },
            }
          : false,
      },
    })
  }

  async delete(id: number, opts?: QueryDto) {
    return await this.databaseService.user.delete({ where: { id } })
  }
}
