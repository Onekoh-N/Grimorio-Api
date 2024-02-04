
import { IsString, IsEmail, MinLength, Validate } from "class-validator";
import { NoWhitespace } from "../../utilidades/decorators/noWithespace.decorator";

export  class LoginDTO {
    @IsEmail()
    readonly email: string;

    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    @IsString()
    readonly password: string;
}