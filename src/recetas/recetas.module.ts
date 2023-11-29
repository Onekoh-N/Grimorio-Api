import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecetaSchema } from './schemas/receta.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Recetas', schema: RecetaSchema}
  ])],
  providers: [RecetasService],
  controllers: [RecetasController]
})
export class RecetasModule {}
