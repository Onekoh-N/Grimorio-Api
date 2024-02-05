import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Rol } from 'src/Modulos/users/roles/roles.enum';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from 'src/utilidades/decorators/auth.decorator';
import { UsuariosService } from 'src/Modulos/users/usuarios.service';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService, private _usersService: UsuariosService) { }

    //Login
    @Post('login')
    async login(@Body() registerDTO: LoginDTO, @Res() res) {
        try {
            const token = await this._authService.login(registerDTO);
        return res.status(HttpStatus.OK).json(
            {
                "success": true,
                "message": "Login exitoso",
                "token": token
            }
        );
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                "success": false,
                "statusCode": 401,
                "message": "Error al iniciar sesion",
                "error": error.response.message
            })
        }       
    }
    //Register
    @Post('register')
    async register(@Res() res, @Body() registerDTO: RegisterDTO) {
        try {
            const usuarioCreado = await this._usersService.CrearUsuario(registerDTO);
            return res.status(HttpStatus.CREATED).json({
                success: true,
                message: 'Usuario creado exitosamente',
                'Created User': {
                    'user': usuarioCreado.userName,
                    'email': usuarioCreado.email,
                    'rol': usuarioCreado.rol
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
