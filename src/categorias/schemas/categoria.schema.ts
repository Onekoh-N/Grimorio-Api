import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoriaDocument = HydratedDocument<Categoria>

@Schema()
export class Categoria{
    @Prop()
    nombre: string;

    @Prop()
    descripcion: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);