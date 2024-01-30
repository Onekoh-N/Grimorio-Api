import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { CategoriaDTO } from './dto/categoria.dto';
import { CategoriasService } from './categorias.service';
import { PaginationOptions } from 'src/Modulos/recetas/interfaces/PaginationOptions.Interface';
import { Auth } from 'src/utilidades/decorators/auth.decorator';
import { Rol } from '../users/roles/roles.enum';


@Controller('categoria')
export class CategoriasController {

    constructor(private categoriaService: CategoriasService) { }

    @Post()
    @Auth(Rol.ADMIN)
    async crearCategoria(@Res() res, @Body() categoriaDTO: CategoriaDTO) {
        try {
            const categoriaCreada = await this.categoriaService.CrearCategoria(categoriaDTO);
            return res.status(HttpStatus.OK).json({
                categoriaCreada: categoriaCreada
            })
        } catch (e) {
            console.log(e);
            throw new BadRequestException("Algo salio mal", e.message);
        }
    }

    @Get()    
    @Auth(Rol.ADMIN)
    async listarCategoria(@Res() res, @Query() options: PaginationOptions) {
        const listadoCategoria = await this.categoriaService.listarCategorias(options);
        return res.status(HttpStatus.OK).json(listadoCategoria);
    }

    @Get("/:categoriaId")
    @Auth(Rol.ADMIN)
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
    @Auth(Rol.ADMIN)
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
    @Auth(Rol.ADMIN)
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
