import { IsDate, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UsuarioDTO {
    @IsString()
    @MinLength(3)
    usuario: string;
    
    @IsString()
    @MinLength(3)
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    rol?: string;
    
    @IsDate()
    @IsOptional()
    readonly fechaCreacion?: Date;

    @IsDate()
    @IsOptional()
    readonly fechaActualizacion?: Date;
}