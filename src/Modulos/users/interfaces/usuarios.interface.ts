

export interface UsuarioInterface {
    readonly usuario: string;
    readonly password: string;
    readonly email: string;
    readonly rol?: string;
    readonly fechaCreacion?: Date;
    fechaActualizacion?: Date;
}