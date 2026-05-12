import { ApiProperty } from "@nestjs/swagger";
import { ServiceOrderItemEntity } from "./service-order-item.entity";

export class ServiceOrderEntity {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    userId!: number;

    @ApiProperty()
    clientId!: number;

    @ApiProperty()
    status!: string;

    @ApiProperty()
    items!: ServiceOrderItemEntity[];

    @ApiProperty()
    total!: number;
}