import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

const mongoosePaginate = require('mongoose-paginate-v2');

export type CategoriaDocument = HydratedDocument<Categoria>

@Schema()
class Categoria{
    @Prop({typpe: String, required: true, unique: true})
    nombre: string;

    @Prop({type: String})
    descripcion: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
CategoriaSchema.plugin(mongoosePaginate);