import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecetasModule } from './Modulos/recetas/recetas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './Modulos/categorias/categorias.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsuariosService } from './Modulos/users/usuarios.service';
import { UsuariosModule } from './Modulos/users/usuarios.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    RecetasModule, 
    MongooseModule.forRoot(process.env.MONGO_URI), 
    CategoriasModule, 
    AuthModule, 
    UsuariosModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UsuariosService],
})
export class AppModule {}
