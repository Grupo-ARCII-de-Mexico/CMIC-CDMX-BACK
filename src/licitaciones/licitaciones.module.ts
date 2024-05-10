import { Module } from '@nestjs/common';
import { LicitacionesService } from './licitaciones.service';
import { LicitacionesController } from './licitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licitacione } from './entities/licitacione.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Licitacione
    ])
  ],
  controllers: [LicitacionesController],
  providers: [LicitacionesService]
})
export class LicitacionesModule {}
