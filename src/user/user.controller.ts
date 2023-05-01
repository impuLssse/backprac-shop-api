import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { ApiOperations } from "src/phrases/swagger.phrases"
import { QueryDto } from "src/core/query-options/dto/query-options.dto"
import { QueryPipe } from "src/core/query-options/query-options.pipe"

@ApiTags("Пользователи")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: ApiOperations.create })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto)
  }

  @ApiOperation({ summary: ApiOperations.getAll })
  @Get()
  async findAll(@Query(QueryPipe) opts?: QueryDto) {
    return await this.userService.findAll(opts)
  }

  @ApiOperation({ summary: ApiOperations.getOneById })
  @Get(":id")
  async findOne(@Param("id") id: number, @Query(QueryPipe) opts?: QueryDto) {
    return await this.userService.findOne(id, opts)
  }

  @ApiOperation({ summary: ApiOperations.updateOneById })
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Query(QueryPipe) opts?: QueryDto
  ) {
    return await this.userService.update(id, updateUserDto, opts)
  }

  @ApiOperation({ summary: ApiOperations.deleteOneById })
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.userService.delete(id)
  }
}
