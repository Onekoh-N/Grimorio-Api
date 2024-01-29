import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/Modulos/users/roles/roles.enum";

export const ROLES_KEY = 'roles';
export const RolDecorator = (rol: Rol) => SetMetadata(ROLES_KEY, rol);