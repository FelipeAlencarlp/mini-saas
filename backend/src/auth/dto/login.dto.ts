import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty({ message: 'Preencha o e-mail.' })
    readonly email!: string;

    @IsNotEmpty({ message: 'Preencha a senha.' })
    readonly password!: string;
}