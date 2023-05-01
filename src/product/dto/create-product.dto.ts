import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsOptional,
  ArrayUnique,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "Название продукта", example: "Резиновый хуй" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Цена", example: 3000 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ description: "Скидка", example: 10, default: 0 })
  @IsNumber()
  @IsOptional()
  sale: number;

  @ApiProperty({ description: "Id категории", example: 8 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: "Ссылки на картинки с товаром",
    example: ["https://hui.com/pic1", "https://hui.com/pic2"],
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ArrayUnique()
  urls: string[];
}
