import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriaDTO } from './dto/categoria.dto';
import { CategoriaInterface } from './interfaces/categoria.interface';
@Injectable()
export class CategoriasService {
    constructor (@InjectModel('Categorias') private readonly categoriaModel){}

    async CrearCategoria(CategoriaDTO: CategoriaDTO): Promise<CategoriaInterface> {
        const Categoria = new this.categoriaModel(CategoriaDTO);
        return await Categoria.save();
    }
    async listarCategorias(): Promise<CategoriaInterface[]>{
        const categorias= await this.categoriaModel.find();
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
