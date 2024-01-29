import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetaDTO } from './dto/receta.dto';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';

@Controller('recetas')
export class RecetasController {
    constructor(private recetasService: RecetasService) { }

    @Post()
    async crearReceta(@Res() res, @Body() recetasDTO: RecetaDTO) {
        try {
            const recetaCreada = await this.recetasService.CrearReceta(recetasDTO);
            return res.status(HttpStatus.OK).json({
                recetaCreada: recetaCreada
            })
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    }

    @Get()
    async listarRecetas(@Res() res, @Query() opciones: PaginationOptions){     
        try {
            const listadoRecetas = await this.recetasService.buscarRecetasConOpciones(opciones);
            return res.status(HttpStatus.OK).json(listadoRecetas);
        } catch (e) {
            throw new NotFoundException('Error al listar Recetas');
        }
    }

    @Get('/autor/:autorId')
    async listarRecetasPorAutor(@Res() res, @Query() options : PaginationOptions, @Param('autorId') autorId){
        try {
            const listadoRecetas = await this.recetasService.listarRecetasPorAutor(options, autorId);
            return res.status(HttpStatus.OK).json(listadoRecetas);
        } catch (e) {
            throw new NotFoundException('Error al listar las recetas por autor');
        }
    }

    @Get(":recetaId")
    async buscarporId(@Res() res, @Param("recetaId") recetaId) {
        try {
            const receta = await this.recetasService.buscarReceta(recetaId);
            if (!receta) throw new NotFoundException('Receta no encontrada');
            return res.status(HttpStatus.OK).json(receta);
        } catch (e) {
            throw new NotFoundException('Receta no encontrada');
        }
    }

    @Put("/:recetaId")
    async editarReceta(@Res() resizeBy, @Param("recetaId") recetaId, @Body() recetasDTO: RecetaDTO) {
        try {
            const recetaEditada = await this.recetasService.modificarReceta(recetaId, recetasDTO);
            if (!recetaEditada) throw new NotFoundException("Receta no encontrada");
            return resizeBy.status(HttpStatus.OK).json({ recetaEditada });
        } catch (e) {
            throw new NotFoundException('Receta no encontrada');
        }
    }

    @Delete('/')
    async eliminarReceta(@Res() res, @Query('recetaId') recetaId) {
        try {
            const recetaEliminada = await this.recetasService.eliminarReceta(recetaId);
            if (!recetaEliminada) throw new NotFoundException('Receta no encontrada');
            return res.status(HttpStatus.OK).json("Receta Eliminada");
        } catch (e) {
            throw new NotFoundException('Receta no encontrada');
        }
    }

}