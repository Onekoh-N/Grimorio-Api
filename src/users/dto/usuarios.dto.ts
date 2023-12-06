import { RolDocument } from "src/roles/schemas/rol.schema";

export class UsuarioDTO {
    readonly usuario: string;
    readonly password: string;
    readonly email: string;
    readonly rol: string;
    readonly fechaCreacion: Date;
    readonly fechaActualizacion: Date;
}