import { Module } from '@nestjs/common';
import { CalendarioCapacitacionesService } from './calendario-capacitaciones.service';
import { CalendarioCapacitacionesController } from './calendario-capacitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarioCapacitacione } from './entities/calendario-capacitacione.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CalendarioCapacitacione])
  ],
  controllers: [CalendarioCapacitacionesController],
  providers: [CalendarioCapacitacionesService]
})
export class CalendarioCapacitacionesModule {}
