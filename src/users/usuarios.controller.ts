import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService) { }

    @Post()
    async crearUsuario(@Res() res, @Body() usuariosDTO: UsuarioDTO) {
        try {
            const usuarioCreada = await this.usuariosService.CrearUsuario(usuariosDTO);
            return res.status(HttpStatus.OK).json({
                usuarioCreada: usuarioCreada
            })
        } catch (e) {
            console.log(e);
            throw new BadRequestException("Algo salio mal :/");
        }
    }

    @Get()
    async listarUsuarios(@Res() res, @Query() options: PaginationOptions) {
        const listadoUsuarios = await this.usuariosService.listarUsuarios(options);
        return res.status(HttpStatus.OK).json(listadoUsuarios);
    }

    @Get('/usuario/:usuarioId')
    async listarUsuariosPorUsuario(@Res() res, @Query() options: PaginationOptions, @Param('usuarioId') usuarioId) {
        const listadoUsuarios = await this.usuariosService.listarUsuariosPorUsuario(options, usuarioId);
        return res.status(HttpStatus.OK).json(listadoUsuarios);
    }

    @Get("/:usuarioId")
    async buscarUsuario(@Res() res, @Param("usuarioId") usuarioId) {
        try {
            const usuario = await this.usuariosService.buscarUsuario(usuarioId);
            if (!usuario) throw new NotFoundException('Usuario no encontrada');
            return res.status(HttpStatus.OK).json(usuario);
        } catch (e) {
            throw new NotFoundException('Usuario no encontrada');
        }
    }

    @Put("/:usuarioId")
    async editarUsuario(@Res() resizeBy, @Param("usuarioId") usuarioId, @Body() usuariosDTO: UsuarioDTO) {
        try {
            const usuarioEditada = await this.usuariosService.modificarUsuario(usuarioId, usuariosDTO);
            if (!usuarioEditada) throw new NotFoundException("Usuario no encontrada");
            return resizeBy.status(HttpStatus.OK).json({ usuarioEditada });
        } catch (e) {
            throw new NotFoundException('Usuario no encontrada');
        }
    }

    @Delete('/')
    async eliminarUsuario(@Res() res, @Query('usuarioid') usuarioId) {
        try {
            const usuarioEliminada = await this.usuariosService.eliminarUsuario(usuarioId);
            if (!usuarioEliminada) throw new NotFoundException('Usuario no encontrada');
            return res.status(HttpStatus.OK).json("Usuario Eliminada");
        } catch (e) {
            throw new NotFoundException('Usuario no encontrada');
        }
    }

}
