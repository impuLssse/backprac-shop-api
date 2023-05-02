import { UserRepository } from "./user.repository"
import { Injectable } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto)
  }

  async findAll(opts?: QueryDto) {
    return await this.userRepository.findAll(opts)
  }

  async findOne(id: number, opts?: QueryDto) {
    return await this.userRepository.findOne(id, opts)
  }

  async update(id: number, dtoUpdate: UpdateUserDto, opts?: QueryDto) {
    return await this.userRepository.update(id, dtoUpdate, opts)
  }

  async delete(id: number) {
    return await this.userRepository.delete(id)
  }
}
