import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsOptional
} from "class-validator";
import { IsValidPhone } from "../decorators/IsValidPhone";
import { Transform } from "class-transformer";

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
    @Transform(({ value }) => {
        if (value) {
            const cleaned = value.replace(/\D/g, '');
            if (cleaned.length === 11) {
                return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
            }
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
        }
        })
    @IsValidPhone()
    readonly phone?: string;
}