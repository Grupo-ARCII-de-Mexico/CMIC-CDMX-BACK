import { Module } from '@nestjs/common';
import { DesastresService } from './desastres.service';
import { DesastresController } from './desastres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desastre } from './entities/desastre.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Desastre]),
  ],
  controllers: [DesastresController],
  providers: [DesastresService],
  exports:[DesastresService,TypeOrmModule]
})
export class DesastresModule {}
