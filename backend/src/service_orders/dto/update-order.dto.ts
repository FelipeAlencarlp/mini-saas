import {
    IsArray,
    ArrayNotEmpty,
    ArrayMinSize,
    ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsArray({ message: 'Precisa ser passado um Array.' })
    @ArrayNotEmpty({ message: 'O Array não pode ser vazio.' })
    @ArrayMinSize(1, { message: 'Um produto é obrigatório.' })
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    declare items: CreateOrderItemDto[];
}