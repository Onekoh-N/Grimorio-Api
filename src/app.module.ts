import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecetasModule } from './recetas/recetas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RecetasModule, MongooseModule.forRoot('mongodb://localhost/recetas-Api')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
