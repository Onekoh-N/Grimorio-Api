import { Injectable } from '@nestjs/common';
import { RecetaInterface } from './interfaces/receta.interface';
import { RecetaDTO } from './dto/receta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import { TagsDTO } from './dto/tags.DTO';
import { BusquedaDTO } from './dto/busqueda.DTO';


@Injectable()
export class RecetasService {
    constructor(@InjectModel('Recetas')
    private readonly recetasModel) { }

    async CrearReceta(recetaDTO: RecetaDTO): Promise<RecetaInterface> {
        if(recetaDTO.tags){
        recetaDTO.tags = recetaDTO.tags.map(tag => tag.toUpperCase());
        }
        if(recetaDTO.tags.length ===0){ //
            delete recetaDTO.tags;      //  Esta parte no hace falta porque si los tags estan vacios el esquema coloca UNTAGGED como default  
        }                               //
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

    async buscarRecetasPorTag(body: BusquedaDTO): Promise<RecetaInterface[]> {
        if(body.tags){
            body.tags = body.tags.map(tag => tag.toUpperCase());
            }
        const datos = { tags: { $in: body.tags }, autorId: body.autorId, nombre: body.nombre };
        // Eliminando valores si no existen
        (!body.tags || body.tags.length === 0) && delete datos.tags;
        !body.autorId && delete datos.autorId;
        !body.nombre && delete datos.nombre;
        //Creando "options" de la paginacion
        const options: PaginationOptions = {
            page: body.page,
            limit: body.limit,
            select: body.select,
            sort: body.sort,
            offset: body.offset
        };
        const recetas = await this.recetasModel.paginate(datos, options);
        return recetas;
    }

}
