import { Injectable } from '@nestjs/common';
import { RecetaInterface } from './interfaces/receta.interface';
import { RecetaDTO } from './dto/receta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import { TagsDTO } from './dto/tags.DTO';


@Injectable()
export class RecetasService {
    constructor(@InjectModel('Recetas')
    private readonly recetasModel) { }

    async CrearReceta(recetaDTO: RecetaDTO): Promise<RecetaInterface> {
        recetaDTO.tags = recetaDTO.tags.map(tag => tag.toUpperCase());
        const receta = new this.recetasModel(recetaDTO);
        return await receta.save();
    }

    async listarRecetas(options: PaginationOptions): Promise<RecetaInterface[]> {
        const camposSelect = options.select ? options.select.split(',') : [];
        options.select = camposSelect.join(' ');
        const recetas = await this.recetasModel.paginate({}, options);
        return recetas;
    }


    async listarRecetasPorAutor(options: PaginationOptions, autorId: number): Promise<RecetaInterface[]> {
        const camposSelect = options.select ? options.select.split(',') : [];
        options.select = camposSelect.join(' ');
        const recetas = await this.recetasModel.paginate({ autorId: autorId }, options);
        return recetas;
    }


    async buscarReceta(recetaId: string): Promise<RecetaInterface> {
        const receta = await this.recetasModel.findById(recetaId);
        return receta;
    }

    async modificarReceta(recetaId: string, recetaDTO: RecetaDTO): Promise<RecetaInterface> {
        const recetaNueva: RecetaInterface = recetaDTO;
        recetaNueva.fechaActualizacion = new Date();
        const recetaModificada = await this.recetasModel.findByIdAndUpdate(recetaId, recetaNueva, { new: true });
        return recetaModificada;
    }

    async eliminarReceta(recetaId: string): Promise<any> {
        const recetaEliminada = await this.recetasModel.findByIdAndDelete(recetaId);
        console.log(recetaEliminada)
        return recetaEliminada;
    }

    async buscarRecetasPorTag(body: TagsDTO): Promise<RecetaInterface[]> {
        const { tags } = body;
        const options : PaginationOptions = body;
        if (!tags || tags.length === 0) {            
            const recetas = await this.recetasModel.paginate({}, options);
            return recetas;
        }        
        const recetas = await this.recetasModel.paginate({ tags: { $in: tags } }, options);
        return recetas;
    }

}
