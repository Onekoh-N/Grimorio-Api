import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Rol } from "../roles/roles.enum";
const mongoosePaginate = require('mongoose-paginate-v2');



@Schema()
export class Usuario {
    @Prop({ unique: true, required: true })
    userName: string;
    
    @Prop({ required: true })
    password: string;
    
    @Prop({ unique: true, required: true })
    email: string;    

    @Prop({default: Rol.USER, enum: Rol})
    rol: Rol;
    
    @Prop({ type: Date, default: Date.now })
    fechaCreacion: Date;
    
    @Prop({ type: Date})
    fechaActualizacion: Date;
}

export type UsuarioDocument = HydratedDocument<Usuario>;
export const UsuariosSchema = SchemaFactory.createForClass(Usuario);
UsuariosSchema.plugin(mongoosePaginate);




