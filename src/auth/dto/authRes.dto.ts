import { Rol } from "src/Modulos/users/roles/roles.enum";

export class AuthResDTO {
    success: boolean;    
    message: string;
    token: string;
    user: {
        userName: string;
        email: string;
        rol: Rol
    };
}