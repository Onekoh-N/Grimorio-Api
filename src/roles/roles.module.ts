import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from './schemas/rol.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Roles', schema: RolSchema}
  ])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
