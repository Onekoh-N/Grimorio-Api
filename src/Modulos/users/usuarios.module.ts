import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosSchema } from './schemas/usuarios.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Usuarios', schema: UsuariosSchema}
  ]),
  forwardRef(() => AuthModule)],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [MongooseModule, UsuariosService]

})
export class UsuariosModule {}
