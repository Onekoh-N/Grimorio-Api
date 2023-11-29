import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type RecetaDocument = Receta & Document;

@Schema({ _id: false })
export class Ingrediente {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    cantidad: number;
}
@Schema({ _id: false })
export class Seccion {
    @Prop({ required: true })
    titulo: string;

    @Prop({ type: [{ type: SchemaFactory.createForClass(Ingrediente) }] })
    ingredientes: Ingrediente[];
}

@Schema({ _id: false })
export class Procedimientos {
    @Prop({ required: true })
    procedimiento: string;

    @Prop({ required: true })
    imgUrl: string;

}

@Schema({ _id: false })
export class Comentarios {
    @Prop({ required: true })
    autorId: string;

    @Prop({ required: true })
    comentario: string;

    @Prop({ required: true, default: Date.now })
    fechaCreacion: Date;
}

@Schema()
export class Receta {
    @Prop({
        type: String,
        required: true
    })
    nombre: string;

    @Prop({
        type: [{
            type: SchemaFactory.createForClass(Seccion)
        }],
        required: true
    })
    secciones: Seccion[];

    @Prop({
        type: [{
            type: SchemaFactory.createForClass(Procedimientos)
        }],
        required: true
    })
    procedimientos: Procedimientos[];

    @Prop({
        type: String,
        required: true,
        default: "-"
    })
    tiempoCoccion: string;

    @Prop({
        type: String,
        required: true,
        default: "-"
    })
    temperaturaCoccion: string;

    @Prop({
        type: String,
        required: true
    })
    autorId: string;

    @Prop({
        type: [String]
    })
    aclaracionesAutor: string[];

    @Prop({
        type: [{
            type: SchemaFactory.createForClass(Comentarios)
        }]
    })
    comentarios: Comentarios[];

    @Prop({
        type: String
    })
    imgUrl: string;

    @Prop({
        type: Boolean
    })
    publico: boolean;


    @Prop({
        type: Date,
        required: true,
        default: Date.now
    })
    fechaCreacion: Date;

}


export const RecetaSchema = SchemaFactory.createForClass(Receta);

