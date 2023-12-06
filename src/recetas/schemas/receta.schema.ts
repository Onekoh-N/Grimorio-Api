import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require('mongoose-paginate-v2');
import { RecetaInterface } from '../interfaces/receta.interface';
import { HydratedDocument } from "mongoose";

@Schema({ _id: false })
class ingrediente {
    nombre: String;
    cantidad: Number;
}
@Schema({ _id: false })
class seccion {
    @Prop()
    titulo: String;
    @Prop()
    ingredientes: ingrediente[];

}
@Schema({ _id: false })
class procedimiento{
    @Prop()
    procedimiento: String;
    @Prop()
    imgUrl: String
}
@Schema({_id:false})
class comentario{
    @Prop()
    autorId: String;
    @Prop()
    comentario: String;
    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;
}
@Schema()
export class Receta {
    @Prop()
    nombre: String;
    @Prop()
    secciones: seccion[];
    @Prop()
    procedimientos: procedimiento[];
    @Prop()
    tiempoCoccion: String;
    @Prop()
    temperaturaCoccion: String;
    @Prop()
    autorId: String;
    @Prop()
    aclaracionesAutor: [String];
    @Prop()
    comentarios: comentario[];
    @Prop()
    imgUrl: String;
    @Prop({type: Boolean, default: false})
    oculto: Boolean;
    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;
}

export type RecetaDocument = HydratedDocument<Receta>;
export const RecetaSchema = SchemaFactory.createForClass(Receta);
RecetaSchema.plugin(mongoosePaginate);