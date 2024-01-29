import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriaDTO } from './dto/categoria.dto';
import { CategoriaInterface } from './interfaces/categoria.interface';
import { PaginationOptions } from 'src/Modulos/recetas/interfaces/PaginationOptions.Interface';
@Injectable()
export class CategoriasService {
    constructor (@InjectModel('Categorias') private readonly categoriaModel){}

    async CrearCategoria(CategoriaDTO: CategoriaDTO): Promise<CategoriaInterface> {

        CategoriaDTO.nombre = CategoriaDTO.nombre.toUpperCase();
        if(await this.categoriaModel.findOne({nombre: CategoriaDTO.nombre})){
            throw new Error('La categoria ya existe');
        }
        const Categoria = new this.categoriaModel(CategoriaDTO);
        return await Categoria.save();
    }
    async listarCategorias(options: PaginationOptions): Promise<CategoriaInterface[]>{
        options.select = options.select ? options.select.toString().split(',') : [];

        const categorias= await this.categoriaModel.paginate({},options);
        return categorias;        
    }

    async buscarCategoria(categoriaId: string): Promise<CategoriaInterface>{
        const categoria= await this.categoriaModel.findById(categoriaId);
        return categoria;
    }

    async modificarCategoria(categoriaId: string, categoriaDTO: CategoriaDTO): Promise<CategoriaInterface>{
        const categoriaNuevo: CategoriaInterface= categoriaDTO;
        const categoriaModificada= await this.categoriaModel.findByIdAndUpdate(categoriaId, categoriaNuevo, { new: true });
        return categoriaModificada;
    }

    async eliminarCategoria(categoriaId: string):Promise<any>{
        const categoriaEliminada = await this.categoriaModel.findByIdAndDelete(categoriaId);
        return categoriaEliminada;
    }
}
