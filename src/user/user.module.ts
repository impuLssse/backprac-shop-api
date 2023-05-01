import { DatabaseModule } from "./../database/database.module"
import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { BasketModule } from "src/basket/basket.module"
import { UserRepository } from "./user.repository"

@Module({
  imports: [DatabaseModule, BasketModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
