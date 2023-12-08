import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolDTO } from './dto/rol.dto';
import { RolInterface } from './interfaces/rol.interface';

@Injectable()
export class RolesService {
    constructor(@InjectModel('Roles')
    private readonly rolesModel) {}

    async CrearRol (rolDTO: RolDTO): Promise<RolInterface>{
        const rol = new this.rolesModel(rolDTO);
        return await rol.save();        
    }

    async listarRoles(): Promise<RolInterface[]>{   
        const roles= await this.rolesModel.find();
        return roles;        
    }

    async buscarRol(rolId: string): Promise<RolInterface>{
        const rol= await this.rolesModel.findById(rolId);
        return rol;
    }

    async modificarRol(rolId: string, rolDTO: RolDTO): Promise<RolInterface>{
        const rolModificada= await this.rolesModel.findByIdAndUpdate(rolId, rolDTO, { new: true });
        return rolModificada;
    }

    async eliminarRol(rolId: string):Promise<any>{
        const rolEliminada = await this.rolesModel.findByIdAndDelete(rolId);
        return rolEliminada;
    }
}
