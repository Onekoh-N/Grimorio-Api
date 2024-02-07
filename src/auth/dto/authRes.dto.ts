import { Rol } from "src/Modulos/users/roles/roles.enum";

export class AuthResDTO {
    success: boolean;
    statusCode: number;
    message: string;
    error?: string;
    token?: string;
    userData?: {
        userName: string;
        email: string;
        rol: string;
    }
}