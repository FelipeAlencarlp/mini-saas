import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    ValidateNested
} from "class-validator";
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    @IsNumber({}, { message: 'O ID precisa ser número.' })
    @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
    @IsPositive({ message: 'ID do cliente inválido.' })
    readonly clientId!: number;

    @IsArray({ message: 'Precisa ser passado um Array.' })
    @ArrayNotEmpty({ message: 'O Array não pode ser vazio.' })
    @ArrayMinSize(1, { message: 'Um produto é obrigatório.' })
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    readonly items!: CreateOrderItemDto[];
}