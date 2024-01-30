import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/Modulos/users/usuarios.service';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor( 
        private readonly _usersService: UsuariosService,
        private readonly _jwtService: JwtService
        ) {}


    async login(registerDTO: LoginDTO) {

        try {                 
            const usuarioEncontrado = await this._usersService.buscarUsuarioPorEmail(registerDTO.email);            
            if (!usuarioEncontrado) {throw new UnauthorizedException('Credenciales incorrectas');}
            const validarPassword = await compare(registerDTO.password, usuarioEncontrado.password);
            if (!validarPassword) {throw new UnauthorizedException('Credenciales incorrectas');}     
            const payload = {                       //Informacion del usuario que se envia en el token
                usuario: usuarioEncontrado.usuario,
                email: usuarioEncontrado.email, 
                rol: usuarioEncontrado.rol
            };  
            const token = await this._jwtService.signAsync(payload);
            return {email : usuarioEncontrado.email, rol: usuarioEncontrado.rol, token};
        } catch (error) {
            throw error;
        }
    }


    register(registerDTO: RegisterDTO) {

        try {
            const usuarioRegistrado = this._usersService.CrearUsuario(registerDTO);
            return usuarioRegistrado;            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
}
