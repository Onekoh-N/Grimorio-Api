import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require('mongoose-paginate-v2');
import { HydratedDocument } from "mongoose";

@Schema({ _id: false })
class ingrediente {
    @Prop({ type: String, required: true })
    nombre: String;
    @Prop({ type: Number, required: true })
    cantidad: Number;
}
@Schema({ _id: false })
class seccion {
    @Prop({ type: String, required: true })
    titulo: String;
    @Prop({ type: [ingrediente], required: true })
    ingredientes: ingrediente[];

}
@Schema({ _id: false })
class procedimiento{
    @Prop({ type: String, required: true })
    procedimiento: String;
}

@Schema({_id:false})
class comentario{
    @Prop({ type: String, required: true })
    autorId: String;
    @Prop({ type: String, required: true })
    comentario: String;
    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;
}
@Schema()
class Receta {
    @Prop( { type: String, required: true })
    nombre: String;
    @Prop({ type: [seccion], required: true })
    secciones: seccion[];
    @Prop({ type: [procedimiento], required: true })
    procedimientos: procedimiento[];
    @Prop({ type: String})
    tiempoCoccion: String;
    @Prop({ type: String})
    temperaturaCoccion: String;
    @Prop({ type: String, required: true })
    autorId: String;
    @Prop({ type: [String], default: [] })
    aclaracionesAutor: [String];
    @Prop({ type: [comentario], default: [] })
    comentarios: comentario[];
    @Prop({type: Boolean, default: false})
    publico: boolean;
    @Prop({type: [String], default: ["UNTAGGED"]})
    tags: string[];
    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;
    @Prop({ type: Date})
    fechaActualizacion: Date;
    
}

export type recetaDocument = HydratedDocument<Receta>;
export const RecetaSchema = SchemaFactory.createForClass(Receta);
RecetaSchema.plugin(mongoosePaginate);