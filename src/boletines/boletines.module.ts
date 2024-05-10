import { Module } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { BoletinesController } from './boletines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boletin } from './entities/boletine.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Boletin
    ])
  ],
  controllers: [BoletinesController],
  providers: [BoletinesService]
})
export class BoletinesModule {}
