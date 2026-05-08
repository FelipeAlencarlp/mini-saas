import { ApiProperty } from "@nestjs/swagger";

export class ClientEntity {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    email?: string | null;

    @ApiProperty()
    phone?: string | null;
}