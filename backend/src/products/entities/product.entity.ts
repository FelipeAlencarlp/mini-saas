import { ApiProperty } from "@nestjs/swagger";

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
