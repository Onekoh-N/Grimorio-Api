import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class RecetaDTO{
    @IsString()
    readonly nombre: string;

    @IsArray()
    readonly secciones: Seccion[];

    @IsArray()
    readonly procedimientos: Procedimientos[];

    @IsString()
    readonly tiempoCoccion: string;


    @IsString()
    readonly temperaturaCoccion: string;

    @IsString()
    readonly autorId: string;

    @IsArray()
    readonly aclaracionesAutor: string[];

    @IsArray()
    readonly comentarios: Comentarios[];

    @IsBoolean()
    readonly publico: boolean;

    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsDate()
    @IsOptional()
    readonly fechaCreacion: Date;

    @IsDate()
    @IsOptional()
    fechaActualizacion: Date;
}
export class Seccion{
    @IsString()
    readonly titulo: string;

    @IsArray()
    readonly ingredientes: Ingrediente[]
    
}
export class Ingrediente{

    @IsString()
    readonly nombre: string;

    @IsNumber()
    readonly cantidad: number;
}
export class Procedimientos{

    @IsString()
    readonly procedimiento: string;

    @IsString()
    readonly imgUrl: string
}

export class Comentarios{

    @IsString()
    readonly autorId: string;

    @IsString()
    readonly comentario: string;
    
    @IsDate()
    readonly fechaCreacion: Date
}