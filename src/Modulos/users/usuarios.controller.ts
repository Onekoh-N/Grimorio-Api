import { Body, Controller, HttpStatus, Post, Get, Res, Param, BadRequestException, Put, NotFoundException, Delete, Query, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import { UsuarioEditadoDTO } from './dto/usuarioEditado.dto';
import { Auth } from 'src/utilidades/decorators/auth.decorator';
import { Rol } from './roles/roles.enum';
import { RegisterDTO } from 'src/auth/dto/register.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService) { }

    //crear un usuario
    @Post()
    @Auth(Rol.ADMIN)
    async crearUsuario(@Res() res, @Body() usuariosDTO: RegisterDTO) {
        const usuarioCreado = await this.usuariosService.CrearUsuario(usuariosDTO);
        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Usuario creado exitosamente',
            createdUser: {
                'user': usuarioCreado.userName,
                'email': usuarioCreado.email,
                'rol': usuarioCreado.rol
            }
        });

    }

    //listar todos los usuarios
    @Get()
    @Auth(Rol.ADMIN)
    async listarUsuarios(@Res() res, @Query() options: PaginationOptions) {
        const listadoUsuarios = await this.usuariosService.listarUsuarios(options);
        return res.status(HttpStatus.OK).json(listadoUsuarios);
    }

    //Buscar un usuario por id
    @Get("/:usuarioId")
    @Auth(Rol.ADMIN)
    async buscarPorId(@Res() res, @Param("usuarioId") usuarioId) {        
            const usuario = await this.usuariosService.buscarUsuario(usuarioId);
            if (!usuario) throw new NotFoundException('Usuario no encontrada');
            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'Usuario encontrado exitosamente',
                foundUser: {
                    id: usuario._id,
                    user: usuario.userName,
                    email: usuario.email,
                    rol: usuario.rol,
                    fechaCreacion: usuario.fechaCreacion,
                    fechaActualizacion: usuario.fechaActualizacion
                }
            });
        
    }

    //Editar un usuario por id
    @Put("/:usuarioId")
    @Auth(Rol.ADMIN)
    async editarUsuario(@Res() res, @Param("usuarioId") usuarioId, @Body() usuarioEditado: UsuarioEditadoDTO) {
        if (!usuarioEditado || usuarioEditado === null) throw new BadRequestException('Faltan datos');
        const usuarioEditada = await this.usuariosService.modificarUsuario(usuarioId, usuarioEditado);
        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Usuario editado exitosamente',
            editedUser: {
                user: usuarioEditada.userName,
                email: usuarioEditada.email,
                rol: usuarioEditada.rol,
                fechaActualizacion: usuarioEditada.fechaActualizacion
            }
        });
    }



//Eliminar un usuario
@Delete('/')
@Auth(Rol.ADMIN)
async eliminarUsuario(@Res() res, @Query('usuarioid') usuarioId) {
    try {
        const usuarioEliminada = await this.usuariosService.eliminarUsuario(usuarioId);
        if (!usuarioEliminada) throw new NotFoundException('Usuario no encontrada');
        return res.status(HttpStatus.OK).json("Usuario Eliminada");
    } catch (e) {
        throw new NotFoundException('Usuario no encontrada');
    }
}

//  ELIMINAR TODO LOS USUARIOS
@Delete('/borrarTodo')
@Auth(Rol.ADMIN)
async eliminarTodo(@Res() res) {
    try {
        const usuriosRestaurados = await this.usuariosService.eliminarTodosLosUsuarios();
        if (!usuriosRestaurados) throw new NotFoundException('No se pudo restaurar los usuarios');
        const usuarioEncontrado = {
            success: true,
            message: "Todos los usuarios han sido eliminados y se restauro el usuario administrador",
            usuarioAdministrador: usuriosRestaurados.email
        }
        return res.status(HttpStatus.OK).json(usuarioEncontrado);
    }
    catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }

}
}
