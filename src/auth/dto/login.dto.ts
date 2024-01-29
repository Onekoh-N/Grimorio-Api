import { Transform } from "class-transformer";
import { IsString, IsEmail, MinLength } from "class-validator";

export  class LoginDTO {
    @IsEmail()
    readonly email: string;

    @Transform(({ value }) => value?.trim()) //Limpia espacios vacios
    @IsString()
    @MinLength(6)
    readonly password: string;
}