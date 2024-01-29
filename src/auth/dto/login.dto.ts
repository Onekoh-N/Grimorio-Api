
import { IsString, IsEmail, MinLength, Validate } from "class-validator";
import { NoWhitespace } from "../../utilidades/noWithespace.validator";

export  class LoginDTO {
    @IsEmail()
    readonly email: string;

    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    @IsString()
    @MinLength(6)
    readonly password: string;
}