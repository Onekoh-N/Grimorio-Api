import { UseGuards, applyDecorators } from "@nestjs/common";
import { Rol } from "src/Modulos/users/roles/roles.enum";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { RolDecorator } from "./roles.decorator";

export function Auth (rol: Rol) {
    return applyDecorators(
        RolDecorator(rol),
        UseGuards(AuthGuard, RolesGuard),
    )
}