import { Injectable } from '@nestjs/common';
import { RecetaInterface } from './interfaces/receta.interface';
import { RecetaDTO } from './dto/receta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';


@Injectable()
export class RecetasService {
    constructor(@InjectModel('Recetas')
    private readonly recetasModel) {}

    async CrearReceta (recetaDTO: RecetaDTO): Promise<RecetaInterface>{
        const receta = new this.recetasModel(recetaDTO);
        return await receta.save();        
    }

    async listarRecetas(options:PaginationOptions): Promise<RecetaInterface[]>{
        const camposSelect = options.select ? options.select.split(','):[];        
        options.select = camposSelect.join(' ');   
        const recetas= await this.recetasModel.paginate({}, options);
        return recetas;        
    }
    

    async listarRecetasPorAutor(options:PaginationOptions, autorId: number): Promise<RecetaInterface[]>{
        const camposSelect = options.select ? options.select.split(','):[];        
        options.select = camposSelect.join(' ');
        const recetas= await this.recetasModel.paginate({autorId: autorId}, options);
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

    async eliminarReceta(recetaId: string):Promise<any>{
        const recetaEliminada = await this.recetasModel.findByIdAndDelete(recetaId);
        console.log(recetaEliminada)
        return recetaEliminada;
    }
}
