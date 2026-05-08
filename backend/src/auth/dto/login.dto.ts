import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty({ message: 'Preencha o e-mail.' })
    @ApiProperty()
    readonly email!: string;

    @IsNotEmpty({ message: 'Preencha a senha.' })
    @ApiProperty()
    readonly password!: string;
}