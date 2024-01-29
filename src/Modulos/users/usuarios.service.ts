import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioInterface } from './interfaces/usuarios.interface';
import { UsuarioDTO } from './dto/usuarios.dto';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';
import {hash} from 'bcryptjs';
import { UsuarioEditadoDTO } from './dto/usuarioEditado.dto';
import { HashPassword } from '../../utilidades/utilidades';

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuarios') private readonly usuarioModel) { }

    async CrearUsuario(usuarioDTO: UsuarioDTO): Promise<UsuarioInterface> {
        try {
            
            usuarioDTO.usuario = usuarioDTO.usuario.replace(/\s+/g, '');
            usuarioDTO.password = await HashPassword(usuarioDTO.password);
            const Usuario = new this.usuarioModel(usuarioDTO);
            return await Usuario.save();
            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async listarUsuarios(options:PaginationOptions): Promise<UsuarioInterface[]>{
        const camposSelect = options.select ? options.select.split(','):[];        
        options.select = camposSelect.join(' ');   
        const usuarios= await this.usuarioModel.paginate({}, options);
        return usuarios;        
    }

    async buscarUsuario(usuarioId: string): Promise<UsuarioInterface>{
        const usuario= await this.usuarioModel.findById(usuarioId);
        return usuario;
    }

    async modificarUsuario(usuarioId: string, usuarioEditadoDTO: UsuarioEditadoDTO){
        if(!usuarioId || !usuarioEditadoDTO) throw new BadRequestException('Faltan datos');
        if(usuarioEditadoDTO.password){
            usuarioEditadoDTO.password = await hash(usuarioEditadoDTO.password, 12);
        }
        if(usuarioEditadoDTO.usuario){
            usuarioEditadoDTO.usuario = usuarioEditadoDTO.usuario.replace(/\s+/g, '');
        }

        const usuarioNuevo: UsuarioInterface= usuarioEditadoDTO;

        usuarioNuevo.fechaActualizacion = new Date();

        const usuarioModificada= await this.usuarioModel.findByIdAndUpdate(usuarioId, usuarioNuevo, { new: true });
        return usuarioModificada;
    }

    async eliminarUsuario(usuarioId: string):Promise<UsuarioInterface>{
        const usuarioEliminada = await this.usuarioModel.findByIdAndDelete(usuarioId);
        return usuarioEliminada;
    }

    //Nuevos

    async buscarUsuarioPorEmail(emailBuscado: string): Promise<UsuarioInterface>{
        const usuario= await this.usuarioModel.findOne({email : emailBuscado});
        return usuario;
    }

    async eliminarTodosLosUsuarios():Promise<UsuarioInterface[]>{
        const usuarioEliminada = await this.usuarioModel.deleteMany({});
        return usuarioEliminada;
    }
}
