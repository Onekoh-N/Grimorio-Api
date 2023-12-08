import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Rol } from "src/roles/schemas/rol.schema";
const mongoosePaginate = require('mongoose-paginate-v2');



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
    
    @Prop({ type: Date})
    fechaActualizacion: Date;
}

export type UsuarioDocument = HydratedDocument<Usuario>;
export const UsuariosSchema = SchemaFactory.createForClass(Usuario);
UsuariosSchema.plugin(mongoosePaginate);




