import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Console } from 'console';
import { AuthGuard } from './guard/auth.guard';
import { Rol } from 'src/decorators/roles.decorator';
import { UsuarioDTO } from 'src/Modulos/users/dto/usuarios.dto';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) { }

    @Post('login')
    login(@Body() registerDTO: LoginDTO ) {                
        return this._authService.login(registerDTO);
    }

    @Post('register')
    async register(@Res() res, @Body() registerDTO: UsuarioDTO) {

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
    @Rol('usuario')
    @UseGuards(AuthGuard, RolesGuard)
    prueba(@Req() req) {
        return req.user;
    }
}