import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RolDocument = HydratedDocument<Rol>

@Schema()
export class Rol{
    @Prop()
    nombre: string;

    @Prop()
    descripcion: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);