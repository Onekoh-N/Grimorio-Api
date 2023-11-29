export class RecetaDTO{
    readonly nombre: string;
    readonly secciones: Seccion[];
    readonly procedimientos: Procedimientos[];
    readonly tiempoCoccion: string;
    readonly temperaturaCoccion: string;
    readonly autorId: string;
    readonly aclaracionesAutor: string[];
    readonly comentarios: Comentarios[];
    readonly imgUrl: string;
    readonly publico: boolean;
    readonly fechaCreacion: Date
}
export class Seccion{
    readonly titulo: string;
    readonly ingredientes: Ingrediente[]
    
}
export class Ingrediente{
    readonly nombre: string;
    readonly cantidad: number
}
export class Procedimientos{
    readonly procedimiento: string;
    readonly imgUrl: string
}
export class Comentarios{
    readonly autorId: string;
    readonly comentario: string;    
    readonly fechaCreacion: Date
}