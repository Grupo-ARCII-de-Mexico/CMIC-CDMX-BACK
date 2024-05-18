import { Module } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { BoletinesController } from './boletines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boletin } from './entities/boletine.entity';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Boletin
    ])
  ],
  controllers: [BoletinesController],
  providers: [BoletinesService, S3Service]
})
export class BoletinesModule {}
