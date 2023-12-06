import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecetasModule } from './recetas/recetas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './users/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [RecetasModule, MongooseModule.forRoot('mongodb://localhost/recetas-Api'), UsuariosModule, RolesModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
