import { IsDate, IsEmail, IsOptional, IsString, MinLength } from "class-validator";
export class UsuarioEditadoDTO {
    @IsString()
    @MinLength(3)
    @IsOptional()
    usuario: string;
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    password: string;

    @IsEmail()
    @IsOptional()
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