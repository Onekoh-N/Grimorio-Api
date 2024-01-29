import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/Modulos/users/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
