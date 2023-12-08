import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioInterface } from './interfaces/usuarios.interface';
import { UsuarioDTO } from './dto/usuarios.dto';
import { PaginationOptions } from './interfaces/PaginationOptions.Interface';

@Injectable()
export class UsuariosService {
    constructor(@InjectModel('Usuarios') private readonly usuarioModel) { }

    async CrearUsuario(UsuarioDTO: UsuarioDTO): Promise<UsuarioInterface> {
        const Usuario = new this.usuarioModel(UsuarioDTO);
        return await Usuario.save();
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

    async modificarUsuario(usuarioId: string, usuarioDTO: UsuarioDTO): Promise<UsuarioInterface>{
        const usuarioNuevo: UsuarioInterface= usuarioDTO;
        usuarioNuevo.fechaActualizacion = new Date();
        const usuarioModificada= await this.usuarioModel.findByIdAndUpdate(usuarioId, usuarioNuevo, { new: true });
        return usuarioModificada;
    }

    async eliminarUsuario(usuarioId: string):Promise<any>{
        const usuarioEliminada = await this.usuarioModel.findByIdAndDelete(usuarioId);
        return usuarioEliminada;
    }
}
