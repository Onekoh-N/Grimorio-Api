import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioInterface } from './interfaces/usuarios.interface';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import { hash } from 'bcryptjs';
import { UsuarioEditadoDTO } from './dto/usuarioEditado.dto';
import { HashPassword } from '../../utilidades/utilidades';
import { Rol } from './roles/roles.enum';
import { UsuarioEncontradoDTO } from './dto/usuarioEncontrado';
import { RegisterDTO } from 'src/auth/dto/register.dto';

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuarios') private readonly usuarioModel) { }

    async CrearUsuario(usuarioDTO: RegisterDTO): Promise<RegisterDTO> {
        try {
            const usuarioEncontrado = await this.usuarioModel.findOne({ userName: usuarioDTO.userName });
            if (usuarioEncontrado) {
                throw new BadRequestException('El usuario esta en uso');
            }
            const mailRegistrado = await this.usuarioModel.findOne({ email: usuarioDTO.email });
            if (mailRegistrado) {
                throw new BadRequestException('El email ya esta registrado');
            }
            usuarioDTO.password = await HashPassword(usuarioDTO.password);
            const Usuario = new this.usuarioModel(usuarioDTO);
            const usuarioCreado = await Usuario.save();
            return usuarioCreado;
        } catch (error) {
            throw new BadRequestException(error.message);
        }

    }
    async listarUsuarios(options: PaginationOptions): Promise<UsuarioEncontradoDTO[]> {
        const camposSelect = options.select ? options.select.split(',') : ["id", "userName", "email", "rol", "fechaCreacion", "fechaActualizacion"];   
        options.select = camposSelect.join(' ');
        const usuarios = await this.usuarioModel.paginate({}, options);
        return usuarios;
    }

    async buscarUsuario(usuarioId: string): Promise<UsuarioEncontradoDTO> {
        try {
            const usuarioEncontrado = await this.usuarioModel.findById(usuarioId);
            if (!usuarioEncontrado) {
                throw new NotFoundException('El id no corresponde a ningun usuario');
            }
        return usuarioEncontrado;
        } catch (error) {
            throw new NotFoundException('El id no corresponde a ningun usuario');
        }
        
    }

    async modificarUsuario(usuarioId: string, usuarioEditadoDTO: UsuarioEditadoDTO) {              
        if (usuarioEditadoDTO.password) {
            usuarioEditadoDTO.password = await hash(usuarioEditadoDTO.password, 12);
        }
        const usuarioNuevo: UsuarioEditadoDTO = usuarioEditadoDTO;
        usuarioNuevo.fechaActualizacion = new Date();
        const usuarioModificada: UsuarioInterface = await this.usuarioModel.findByIdAndUpdate({_id: usuarioId}, usuarioNuevo, { new: true });
        return usuarioModificada;
    }

    async eliminarUsuario(usuarioId: string): Promise<UsuarioInterface> {
        const usuarioEliminada = await this.usuarioModel.findByIdAndDelete(usuarioId);
        return usuarioEliminada;
    }

    //Nuevos

    async buscarUsuarioPorEmail(emailBuscado: string): Promise<UsuarioInterface> {
        const usuario = await this.usuarioModel.findOne({ email: emailBuscado });
        return usuario;
    }

    async eliminarTodosLosUsuarios(): Promise<RegisterDTO> {
        await this.usuarioModel.deleteMany({});
        const usuarioAdmin: RegisterDTO = await this.CrearUsuario({
            userName: 'admin',
            password: 'admin123',
            email: 'admin@admin.com',
            rol: Rol.ADMIN
        });
        return usuarioAdmin;
    }
}
