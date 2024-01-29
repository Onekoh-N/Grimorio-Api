import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query } from '@nestjs/common';
import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import { UsuarioEditadoDTO } from './dto/usuarioEditado.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService) { }

    @Post()
    async crearUsuario(@Res() res, @Body() usuariosDTO: UsuarioDTO) {
        const usuarioCreada = await this.usuariosService.CrearUsuario(usuariosDTO);
        return res.status(HttpStatus.OK).json({ usuarioCreado: usuarioCreada }); 
    }

    @Get()
    async listarUsuarios(@Res() res, @Query() options: PaginationOptions) {
        const listadoUsuarios = await this.usuariosService.listarUsuarios(options);
        return res.status(HttpStatus.OK).json(listadoUsuarios);
    }

    @Get("/:usuarioId")
    async buscarPorId(@Res() res, @Param("usuarioId") usuarioId) {
        try {
            const usuario = await this.usuariosService.buscarUsuario(usuarioId);
            if (!usuario) throw new NotFoundException('Usuario no encontrada');
            return res.status(HttpStatus.OK).json(usuario);
        } catch (e) {
            throw new NotFoundException('Usuario no encontrada');
        }
    }

    @Put("/:usuarioId")
    async editarUsuario(@Res() res, @Param("usuarioId") usuarioId, @Body() usuarioEditado: UsuarioEditadoDTO) {
        
        const usuarioEditada = await this.usuariosService.modificarUsuario(usuarioId, usuarioEditado);
        if (!usuarioEditada) throw new NotFoundException("Usuario no encontrada");
        return res.status(HttpStatus.OK).json({ usuarioEditada });
        
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

    ///////// 
    @Delete('/borrarTodo')
    async eliminarTodo() {
        try {
            const usuriosEliminados = await this.usuariosService.eliminarTodosLosUsuarios();
            return usuriosEliminados;
        } catch (error) {
            return error
        }

    }

}