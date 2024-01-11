import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
const mongoosePaginate = require('mongoose-paginate-v2');
import { HydratedDocument } from "mongoose";

export type RolDocument = HydratedDocument<Rol>

@Schema({_id: false})
export class Rol{
    @Prop({type: String, required: true, unique: true})
    _id: string;
    
    @Prop({type: String, required: true, unique: true})
    nombre: string;

    @Prop({type: String})
    descripcion: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);
RolSchema.plugin(mongoosePaginate);