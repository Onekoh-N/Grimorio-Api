import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/Modulos/users/usuarios.service';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { AuthResDTO } from './dto/authRes.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsuariosService,
        private readonly _jwtService: JwtService
    ) { }


    async login(registerDTO: LoginDTO): Promise<AuthResDTO> {
        try {
            const usuarioEncontrado = await this._usersService.buscarUsuarioPorEmail(registerDTO.email);
            if (!usuarioEncontrado) { throw new UnauthorizedException({ "success": false, "message": "Credenciales incorrectas" }); }
            const validarPassword = await compare(registerDTO.password, usuarioEncontrado.password);
            if (!validarPassword) { throw new UnauthorizedException({ "success": false, "message": "Credenciales incorrectas" }); }
            const payload = {                       //Informacion del usuario que se envia en el token
                _id: usuarioEncontrado._id,
                userName: usuarioEncontrado.userName,
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol
            };
            const token = await this._jwtService.signAsync(payload);
            const authRes: AuthResDTO = {
                success: true,
                statusCode: 200,
                message: 'Login exitoso',
                token: token,
                userData: {
                    userName: usuarioEncontrado.userName,
                    email: usuarioEncontrado.email,
                    rol: usuarioEncontrado.rol
                }
            }
            return authRes;
        } catch (error) {
            const authRes: AuthResDTO = {
                success: false,
                statusCode: error.statusCode,
                message: 'Error al registrar el usuario',               
            }
            return authRes;
        }
    }


    async register(registerDTO: RegisterDTO) {
        try {
            const usuariocreado = await this._usersService.CrearUsuario(registerDTO);
            const authRes: AuthResDTO = {
                success: true,
                statusCode: 200,
                message: 'Registro exitoso',
                userData: {
                    userName: usuariocreado.userName,
                    email: usuariocreado.email,
                    rol: usuariocreado.rol
                }
            }
            return authRes;
        } catch (error) {
            const authRes: AuthResDTO = {
                success: false,
                statusCode: error.statusCode,
                message: 'Error al registrar el usuario',               
            }
            return authRes;
        }
    }

}
