import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolDTO } from './dto/rol.dto';
import { PaginationOptions } from 'src/recetas/interfaces/PaginationOptions.Interface';

@Controller('rol')
export class RolesController {

    constructor(private  rolesService:  RolesService) { }

    @Post()
    async crearRol(@Res() res, @Body()  rolesDTO: RolDTO) {
        try {
            const  rolCreada = await this. rolesService.CrearRol( rolesDTO);
            return res.status(HttpStatus.OK).json({
                rolCreada:  rolCreada
            })
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    } 

    @Get('/list')
    async listarRoles(@Res() res, @Query() opciones: PaginationOptions) {
        const listadoRoles = await this. rolesService.listarRoles(opciones);
        return res.status(HttpStatus.OK).json(listadoRoles);
    }

    @Get("/:rolId")
    async buscarRol(@Res() res, @Param("rolId")  rolId) {
        try {
            const  rol = await this. rolesService.buscarRol( rolId);
            if (!rol) throw new NotFoundException('Rol no encontrada');
            return res.status(HttpStatus.OK).json( rol);
        } catch (e) {
            throw new NotFoundException('Rol no encontrada');
        }
    }

    @Put("/")
    async editarRol(@Res() res, @Query('rolid') rolId, @Body()  rolesDTO: RolDTO) {
        try {
            const  rolEditada = await this.rolesService.modificarRol(rolId, rolesDTO);
            if (!rolEditada) throw new NotFoundException("Rol no encontrada");
            return res.status(HttpStatus.OK).json({ rolEditada });
        } catch (e) {
            throw new NotFoundException('Rol no encontrada');
        }
    }

    @Delete('/')
    async eliminarRol(@Res() res, @Query('rolid') rolId) {
        try {            
            const rolEliminada = await this.rolesService.eliminarRol(rolId);
            if (!rolEliminada) throw new NotFoundException('Rol no encontrada');
            return res.status(HttpStatus.OK).json("Rol Eliminada");
        } catch (e) {
            throw new NotFoundException(e.message);
        }
    }

}
