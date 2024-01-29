import { IsString } from "class-validator";

export class RolDTO {
    @IsString()
    readonly _id?: string;

    @IsString()
    nombre: string;   
    
    @IsString()
    readonly descripcion: string;
}