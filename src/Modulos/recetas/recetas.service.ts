import { Injectable } from '@nestjs/common';
import { RecetaInterface } from './interfaces/receta.interface';
import { RecetaDTO } from './dto/receta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';


@Injectable()
export class RecetasService {
    constructor(@InjectModel('Recetas')
    private readonly recetasModel) { }

    async CrearReceta(recetaDTO: RecetaDTO): Promise<RecetaInterface> {
        if(recetaDTO.tags){
        recetaDTO.tags = recetaDTO.tags.map(tag => tag.toUpperCase());
        }        
        if(recetaDTO.tags.length === 0){
            delete recetaDTO.tags;      
        }
        const receta = new this.recetasModel(recetaDTO);
        return await receta.save();
    }

    async listarRecetas(options: PaginationOptions): Promise<RecetaInterface[]> {
        options.select = options.select ? options.select.toString().split(',') : [];         
        const recetas = await this.recetasModel.paginate({}, options);
        return recetas;
    }

    async listarRecetasPorAutor(options: PaginationOptions, autorId: number): Promise<RecetaInterface[]> {
        options.select = options.select ? options.select.toString().split(',') : [];
        const recetas = await this.recetasModel.paginate({ autorId: autorId }, options);
        return recetas;
    }

    async buscarReceta(recetaId: string): Promise<RecetaInterface> {
        const receta = await this.recetasModel.findById(recetaId);
        return receta;
    }

    async modificarReceta(recetaId: string, recetaDTO: RecetaDTO): Promise<RecetaInterface> {
        if(recetaDTO.tags){
        recetaDTO.tags = recetaDTO.tags.map(tag => tag.toUpperCase());
        }
        const recetaNueva: RecetaInterface = recetaDTO;
        recetaNueva.fechaActualizacion = new Date();
        const recetaModificada = await this.recetasModel.findByIdAndUpdate(recetaId, recetaNueva, { new: true });
        return recetaModificada;
    }

    async eliminarReceta(recetaId: string): Promise<any> {
        const recetaEliminada = await this.recetasModel.findByIdAndDelete(recetaId);        
        return recetaEliminada;
    }

    async buscarRecetasConOpciones(opciones: PaginationOptions): Promise<RecetaInterface[]> {
        if(opciones.tags){            
            let arrayTags: string[] = opciones.tags.toString().split(',');   // Pasando tags a array     
            opciones.tags = arrayTags;             
            opciones.tags = opciones.tags.map(tag => tag.toUpperCase());// Pasando tags a mayusculas            
        }
        opciones.select = opciones.select ? opciones.select.toString().split(',') : [];// Pasando select a array
        
        const datos = {tags: { $in: opciones.tags }, autorId: opciones.autorId, nombre: opciones.nombre}; 
        
        (!opciones.tags || opciones.tags.length === 0) && delete datos.tags;    // Eliminando valores si no existen
        !opciones.autorId && delete datos.autorId;                              // Eliminando valores si no existen
        !opciones.nombre && delete datos.nombre;                                // Eliminando valores si no existen
        

        // opciones.offset = opciones.offset ? Number(opciones.offset) : 0;
        // opciones.limit = opciones.limit ? Number(opciones.limit) : 10;        
        //Creando "options" de la paginacion
        const opcionesSeteadas: PaginationOptions = {
            page: opciones.page,
            select: opciones.select,
            sort: opciones.sort
        };
        
        if(opciones.offset){
            opcionesSeteadas.offset = Number(opciones.offset);
        }
        if(opciones.limit){
            opcionesSeteadas.limit = Number(opciones.limit);
        }
        const recetas = await this.recetasModel.paginate(datos, opcionesSeteadas);
        return recetas;
    }
    
}
