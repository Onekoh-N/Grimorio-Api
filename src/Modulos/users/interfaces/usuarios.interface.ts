import { Rol } from "../roles/roles.enum";


export interface UsuarioInterface {
    readonly _id: string;
    readonly userName: string;
    readonly password: string;
    readonly email: string;
    readonly rol?: Rol;
    readonly fechaCreacion?: Date;
    fechaActualizacion?: Date;
}