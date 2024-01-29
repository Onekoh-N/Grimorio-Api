import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosSchema } from './schemas/usuarios.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Usuarios', schema: UsuariosSchema}
  ])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [MongooseModule, UsuariosService]

})
export class UsuariosModule {}
