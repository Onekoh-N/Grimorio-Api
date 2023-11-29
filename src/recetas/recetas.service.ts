import { Injectable } from '@nestjs/common';
import { RecetaInterface } from './interfaces/receta.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RecetaDTO } from './dto/receta.dto';


@Injectable()
export class RecetasService {
    constructor(
        @InjectModel("Recetas" )
        private readonly recetasModel: Model<RecetaInterface>
        ) {}

    async CrearReceta (recetaDTO: RecetaDTO): Promise<RecetaInterface>{
        const receta = new this.recetasModel(recetaDTO);
        return await receta.save();
        
    }

    async listarRecetas(): Promise<RecetaInterface[]>{
        const recetas= await this.recetasModel.find();
        return recetas;        
    }

    async buscarReceta(recetaId: string): Promise<RecetaInterface>{
        const receta= await this.recetasModel.findById(recetaId);
        return receta;
    }

    async modificarReceta(recetaId: string, recetaDTO: RecetaDTO): Promise<RecetaInterface>{
        const recetaModificada= await this.recetasModel.findByIdAndUpdate(recetaId, recetaDTO, { new: true });
        return recetaModificada;
    }

    async eliminarReceta(recetaId: string):Promise<RecetaInterface>{
        const recetaEliminada = await this.recetasModel.findByIdAndDelete(recetaId);
        return recetaEliminada;
    }

    async recetasPorAutor(autorId): Promise<RecetaInterface[]>{
        const recetasPorAutor = await this.recetasModel.find({autorId: autorId});
        return recetasPorAutor;
    }

}
