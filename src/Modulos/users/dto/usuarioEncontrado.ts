
import { Rol } from "../roles/roles.enum";
export class UsuarioEncontradoDTO {
    readonly _id: string;
    readonly userName: string;
    readonly email: string;
    readonly rol: Rol;
    readonly fechaCreacion: Date;
    readonly fechaActualizacion: Date;
}