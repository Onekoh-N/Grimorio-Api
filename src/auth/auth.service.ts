import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/Modulos/users/usuarios.service';
import { LoginDTO } from './dto/login.dto';
import { UsuarioDTO } from 'src/Modulos/users/dto/usuarios.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

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
            const payload = {email: usuarioEncontrado.email, rol: usuarioEncontrado.rol};  //Informacion del usuario que se envia en el token
            const token = await this._jwtService.signAsync(payload);
            return {email : usuarioEncontrado.email, rol: usuarioEncontrado.rol, token};
        } catch (error) {
            throw error;
        }
    }


    register(usuarioDTO: UsuarioDTO) {

        try {
            const usuarioRegistrado = this._usersService.CrearUsuario(usuarioDTO);
            return usuarioRegistrado;            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
}
