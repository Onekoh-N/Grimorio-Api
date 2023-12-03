import mongoose, { Schema } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
import { RecetaInterface } from '../interfaces/receta.interface';


export const RecetaSchema = new Schema({
    nombre: String,
    secciones: [{ 
        titulo: String, 
        ingredientes: [{ 
            nombre: String, 
            cantidad: Number
        }]
    }],
    procedimientos: [{ 
        procedimiento: String, 
        imgUrl: String 
    }],
    tiempoCoccion: String,
    temperaturaCoccion: String,
    autorId: String,
    aclaracionesAutor: [String],
    comentarios: [{ 
        autorId: String, 
        comentario: String, 
        fechaCreacion: { type: Date, default: Date.now } 
    }],
    imgUrl: String,
    oculto: Boolean,
    fechaCreacion: { type: Date, default: Date.now }
})

RecetaSchema.plugin(mongoosePaginate);


export const recetasModel = mongoose.model<RecetaInterface>('Recetas', RecetaSchema);
    

