import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Validate } from "class-validator";
import { NoWhitespace } from "../../utilidades/decorators/noWithespace.decorator";
import { Rol } from "src/Modulos/users/roles/roles.enum";

export class RegisterDTO {
    @IsString()
    @MinLength(3)
    @Validate(NoWhitespace, { message: 'El Usuario no puede contener espacios en blanco' })
    userName: string;

    @IsEmail()
    email: string;
    
    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Rol, { message: 'Rol invalido' })  
    @IsOptional() 
    rol?: Rol; 
}