import { IsEmail, IsString, MinLength, Validate } from "class-validator";
import { NoWhitespace } from "../../utilidades/noWithespace.validator";

export class RegisterDTO {
    @IsString()
    @MinLength(3)
    @Validate(NoWhitespace, { message: 'El Usuario no puede contener espacios en blanco' })
    readonly usuario: string;

    @IsEmail()
    readonly email: string;
    
    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    @IsString()
    @MinLength(6)
    readonly password: string;
}