import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Console } from 'console';
import { AuthGuard } from './guard/auth.guard';
import { RolDecorator } from 'src/utilidades/decorators/roles.decorator';
import { UsuarioDTO } from 'src/Modulos/users/dto/usuarios.dto';
import { RolesGuard } from './guard/roles.guard';
import { Rol } from 'src/Modulos/users/roles/roles.enum';
import { RegisterDTO } from './dto/register.dto';
import { Auth } from 'src/utilidades/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) { }

    @Post('login')
    login(@Body() registerDTO: LoginDTO ) {                
        return this._authService.login(registerDTO);
    }

    @Post('register')
    async register(@Res() res, @Body() registerDTO: RegisterDTO) {

        try {            
            const usuarioCreada = await this._authService.register(registerDTO);
            
            return res.status(HttpStatus.OK).json({ 
                usuario: usuarioCreada.usuario,
                email: usuarioCreada.email,
                fechaCreacion: usuarioCreada.fechaCreacion 
            }); 

        } catch (error) {            
            throw new BadRequestException(error.message);
        }
        
        
    }

    @Get('prueba')
    @Auth(Rol.USER)
    prueba(@Req() req) {
        return req.user;
    }
}
