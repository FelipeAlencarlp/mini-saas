import { IsNotEmpty, IsInt, IsPositive, Min } from "class-validator";

export class CreateOrderItemDto {
    @IsInt({ message: 'O ID precisa ser número.' })
    @IsNotEmpty({ message: 'O ID é obrigatório.' })
    @IsPositive({ message: 'ID do produto inválido.' })
    productId!: number;

    @IsInt({ message: 'Valor inválido.' })
    @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
    @Min(1, { message: 'Quantidade minima é 1.' })
    quantity!: number;
}