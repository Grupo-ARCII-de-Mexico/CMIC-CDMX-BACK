import { Module } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';
import { ComisionesController } from './comisiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comision } from './entities/comisione.entity';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Comision
    ])
  ],
  controllers: [ComisionesController],
  providers: [ComisionesService, S3Service]
})
export class ComisionesModule {}
