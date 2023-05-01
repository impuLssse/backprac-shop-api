import { CategoryRepository } from "./category.repository"
import { Category } from "@prisma/client"
import { Injectable } from "@nestjs/common"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(dto)
  }

  async findAll(opts?: QueryDto): Promise<Category[]> {
    return await this.categoryRepository.findAll(opts)
  }

  async findOne(id: number, opts?: QueryDto): Promise<Category> {
    return await this.categoryRepository.findOne(id, opts)
  }

  async deleteOne(id: number, opts?: QueryDto) {
    return await this.categoryRepository.deleteOne(id, opts)
  }
}
