import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { CreateProductDto } from "./dto/create-product.dto"
import { Product } from "@prisma/client"
import { UpdateProductDto } from "./dto/update-product.dto"

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateProductDto, opts?: QueryDto): Promise<Product> {
    return await this.databaseService.product.create({
      data: {
        ...dto,
        urls: {
          create: dto.urls.map((url) => ({ url })),
        },
      },
      include: {
        category: true,
        urls: true,
      },
    })
  }

  async findAll(opts?: QueryDto) {
    return await this.databaseService.product.findMany({
      where: {
        categoryId: {
          equals: opts.take.get("categoryId"),
        },
      },
      include: {
        category: opts.include.get("category"),
        urls: opts.include.get("urls"),
      },
    })
  }

  async findOne(id: number, opts?: QueryDto): Promise<Product> {
    return await this.databaseService.product.findUnique({
      where: { id },
      include: {
        category: opts.include.get("category"),
        urls: opts.include.get("urls"),
      },
    })
  }

  async update(id: number, dtoUpdate: UpdateProductDto, opts?: QueryDto) {
    return await this.databaseService.product.update({
      data: dtoUpdate,
      where: { id },
      include: {
        urls: opts.include.get("urls"),
        category: opts.include.get("category"),
      },
    })
  }

  async delete(id: number, opts?: QueryDto): Promise<Product> {
    return await this.databaseService.product.delete({
      where: { id },
      include: {
        category: true,
        urls: true,
      },
    })
  }
}
