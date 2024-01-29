import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const Rol = (rol: string) => SetMetadata(ROLES_KEY, rol);