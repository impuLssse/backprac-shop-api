import { ProductRepository } from "./product.repository"
import { Product } from "@prisma/client"
import { Injectable } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: CreateProductDto, opts?: QueryDto): Promise<Product> {
    return await this.productRepository.create(dto, opts)
  }

  async findAll(opts?: QueryDto) {
    return await this.productRepository.findAll(opts)
  }

  async findOne(id: number, opts?: QueryDto): Promise<Product> {
    return await this.productRepository.findOne(id, opts)
  }

  async delete(id: number): Promise<Product> {
    return await this.productRepository.delete(id)
  }
}
