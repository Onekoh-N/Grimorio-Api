import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolDTO } from './dto/rol.dto';
import { RolInterface } from './interfaces/rol.interface';

@Injectable()
export class RolesService {
    constructor(@InjectModel('Roles')
    private readonly rolesModel) {}

    async CrearRol (rolDTO: RolDTO): Promise<RolInterface>{
        rolDTO.nombre = rolDTO.nombre.toUpperCase();
        const rolEncontrado = await this.rolesModel.findOne({ nombre: rolDTO.nombre });
        if (rolEncontrado) {
            throw new Error('El rol ya existe');
        }
        const rol = new this.rolesModel(rolDTO);
        return await rol.save();        
    }

    async listarRoles(opciones): Promise<RolInterface[]>{ 
        opciones.select = opciones.select ? opciones.select.toString().split(',') : []; 
        const roles= await this.rolesModel.paginate({},opciones);
        return roles;        
    }

    async buscarRol(rolId: string): Promise<RolInterface>{
        const rol= await this.rolesModel.findById(rolId);
        return rol;
    }

    async modificarRol(rolId: string, rolDTO: RolDTO): Promise<RolInterface>{
        if(rolDTO.nombre){
            rolDTO.nombre = rolDTO.nombre.toUpperCase();
        }
        const rolModificada= await this.rolesModel.findByIdAndUpdate(rolId, rolDTO, { new: true });
        return rolModificada;
    }

    async eliminarRol(rolId: string):Promise<RolDTO>{
        const rolEliminada = await this.rolesModel.findOneAndDelete({_id: rolId});
        console.log(rolEliminada);
        return rolEliminada;
    }
}
