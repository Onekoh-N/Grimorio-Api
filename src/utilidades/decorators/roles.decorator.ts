import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/Modulos/users/roles/roles.enum";


export const RolDecorator = (rol: Rol) => SetMetadata(process.env.ROLES_KEY, rol);