import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3, { message: 'O nome precisa ter 3 ou mais caracteres.' })
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    readonly name!: string;

    @IsNumber()
    @Min(0.01, { message: 'O valor mínimo deve ser 0.01' })
    @IsNotEmpty({ message: 'O preço é obrigatório.' })
    readonly price!: number;

    @Min(1, { message: 'A quantidade mínima é 1.' })
    @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
    readonly quantity!: number;
}
