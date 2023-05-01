import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ description: 'Имя', example: 'impuLssse' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Почта', example: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ description: 'Тел', example: '+79242790548', default: null })
  @IsOptional()
  @IsPhoneNumber('RU')
  @IsString()
  phone: string

  @ApiProperty({ description: 'Пароль', example: `interpolHvatitMenyaIskat` })
  @IsString()
  password: string
}
