import { ApiProperty } from "@nestjs/swagger";

export class ServiceOrderItemEntity {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    productId!: number;

    @ApiProperty()
    quantity!: number;

    @ApiProperty()
    soldPrice!: number;

    @ApiProperty()
    subtotal!: number;
}