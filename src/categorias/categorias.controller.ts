import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { CategoriaDTO } from './dto/categoria.dto';
import { CategoriasService } from './categorias.service';


@Controller('categoria')
export class CategoriasController {

    constructor(private categoriaService: CategoriasService) { }

    @Post()
    async crearCategoria(@Res() res, @Body() categoriaDTO: CategoriaDTO) {
        try {
            const categoriaCreada = await this.categoriaService.CrearCategoria(categoriaDTO);
            return res.status(HttpStatus.OK).json({
                categoriaCreada: categoriaCreada
            })
        } catch (e) {
            console.log(e);
            throw new BadRequestException("Algo salio mal :/");
        }
    }

    @Get()
    async listarCategoria(@Res() res) {
        const listadoCategoria = await this.categoriaService.listarCategorias();
        return res.status(HttpStatus.OK).json(listadoCategoria);
    }

    @Get("/:categoriaId")
    async buscarPorId(@Res() res, @Param("categoriaId") categoriaId) {
        try {
            const categoria = await this.categoriaService.buscarCategoria(categoriaId);
            if (!categoria) throw new NotFoundException('Categoria no encontrada');
            return res.status(HttpStatus.OK).json(categoria);
        } catch (e) {
            throw new NotFoundException('Categoria no encontrada');
        }
    }

    @Put("/:categoriaId")
    async editarCategoria(@Res() resizeBy, @Param("categoriaId") categoriaId, @Body() categoriaDTO: CategoriaDTO) {
        try {
            const categoriaEditada = await this.categoriaService.modificarCategoria(categoriaId, categoriaDTO);
            if (!categoriaEditada) throw new NotFoundException("Categoria no encontrada");
            return resizeBy.status(HttpStatus.OK).json({ categoriaEditada });
        } catch (e) {
            throw new NotFoundException('Categoria no encontrada');
        }
    }

    @Delete('/')
    async eliminarCategoria(@Res() res, @Query('categoriaid') categoriaId) {
        try {
            const categoriaEliminada = await this.categoriaService.eliminarCategoria(categoriaId);
            if (!categoriaEliminada) throw new NotFoundException('Categoria no encontrada');
            return res.status(HttpStatus.OK).json("Categoria Eliminada");
        } catch (e) {
            throw new NotFoundException('Categoria no encontrada');
        }
    }

}
