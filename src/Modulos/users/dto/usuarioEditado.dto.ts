import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MinLength, Validate } from "class-validator";
import { Rol } from "../roles/roles.enum";
import { NoWhitespace } from "src/utilidades/noWithespace.validator";
export class UsuarioEditadoDTO {
    @IsString()
    @MinLength(3)
    @IsOptional()
    @Validate(NoWhitespace, { message: 'El usuario no puede contener espacios en blanco' })
    usuario: string;
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    @Validate(NoWhitespace, { message: 'La contraseña no puede contener espacios en blanco' })
    password: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsEnum(Rol)
    @IsOptional()
    rol?: Rol;
    
    @IsDate()
    @IsOptional()
    readonly fechaCreacion?: Date;

    @IsDate()
    @IsOptional()
    readonly fechaActualizacion?: Date;
}