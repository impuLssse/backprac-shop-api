import { Module } from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CategoryController } from "./category.controller"
import { DatabaseModule } from "src/database/database.module"
import { CategoryRepository } from "./category.repository"

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
