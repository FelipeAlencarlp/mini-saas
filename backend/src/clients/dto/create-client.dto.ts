import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsOptional
} from "class-validator";
import { IsValidPhone } from "../decorators/IsValidPhone";

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
    @IsValidPhone()
    readonly phone?: string
}