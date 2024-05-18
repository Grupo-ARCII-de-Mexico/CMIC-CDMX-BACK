import { Module } from '@nestjs/common';
import { CalendarioCapacitacionesService } from './calendario-capacitaciones.service';
import { CalendarioCapacitacionesController } from './calendario-capacitaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarioCapacitacione } from './entities/calendario-capacitacione.entity';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CalendarioCapacitacione])
  ],
  controllers: [CalendarioCapacitacionesController],
  providers: [CalendarioCapacitacionesService, S3Service]
})
export class CalendarioCapacitacionesModule {}
