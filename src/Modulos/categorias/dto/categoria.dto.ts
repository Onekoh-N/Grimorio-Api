import { IsString } from "class-validator";

export class CategoriaDTO{
    @IsString()
    nombre: string;
    @IsString()
    readonly descripcion: string;
}