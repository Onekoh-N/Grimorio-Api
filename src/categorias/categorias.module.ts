import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './schemas/categoria.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Categorias', schema: CategoriaSchema}])],
  providers: [CategoriasService],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
