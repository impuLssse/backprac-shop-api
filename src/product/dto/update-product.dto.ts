import { IsString, IsNumber } from 'class-validator'

export class UpdateProductDto {
    @IsString()
    name: string
    
    @IsNumber()
    price: number

    @IsNumber()
    sale: number | undefined

    @IsNumber()
    categoryId: number
}