import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { Category } from "@prisma/client"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Injectable()
export class CategoryRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.databaseService.category.create({ data: dto })
  }

  async findAll(opts?: QueryDto): Promise<Category[]> {
    return await this.databaseService.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      where: {
        id: {
          equals: opts.take.get('categoryId'),
        }
      }
    })
  }

  async findOne(id: number, opts?: QueryDto): Promise<Category> {
    return await this.databaseService.category.findUnique({
      where: { id },
    })
  }

  async update(id: number, dtoUpdate: UpdateCategoryDto, opts?: QueryDto) {
    return await this.databaseService.product.update({
      data: dtoUpdate,
      where: { id },
      include: {
        urls: opts.include.get("urls"),
        category: opts.include.get("category"),
      },
    })
  }

  async deleteOne(id: number, opts?: QueryDto) {
    return await this.databaseService.category.delete({
      where: { id },
    })
  }
}
