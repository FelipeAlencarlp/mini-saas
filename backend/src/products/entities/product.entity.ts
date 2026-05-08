import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ProductEntity {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    price!: number;

    @ApiProperty()
    quantity!: number;
}
