import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Rol } from "src/roles/schemas/rol.schema";
const mongoosePaginate = require('mongoose-paginate-v2');


export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop()
    usuario: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rol' })
    // rol: Rol
    @Prop()
    rol: string

    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;

    @Prop({ type: Date, default: Date.now })
    fechaActualizacion: Date;
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuario);
UsuariosSchema.plugin(mongoosePaginate);




