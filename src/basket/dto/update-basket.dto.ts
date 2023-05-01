import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, } from "class-validator";


export class UpdateBasketDto {
    @ApiProperty({
        description: 'Наполните массив productId, чтобы обновить их в корзине пользователя',
        examples: [[3, 4], []]
    })
    @ArrayMaxSize(15)
    products: number[] | undefined
}