import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsOptional,
    Matches
} from "class-validator";

export class CreateClientDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @MinLength(3, { message: 'O nome precisa ter 3 ou mais caracteres.' })
    readonly name!: string;

    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    @Matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
        message: 'Telefone inválido'
    })
    readonly phone?: string;
}