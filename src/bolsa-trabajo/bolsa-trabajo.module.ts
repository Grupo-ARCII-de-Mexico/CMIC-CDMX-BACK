import { Module } from '@nestjs/common';
import { BolsaTrabajoService } from './bolsa-trabajo.service';
import { BolsaTrabajoController } from './bolsa-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BolsaTrabajo } from './entities/bolsa-trabajo.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BolsaTrabajo])
  ],
  controllers: [BolsaTrabajoController],
  providers: [BolsaTrabajoService],
  exports:[BolsaTrabajoService,TypeOrmModule]
})
export class BolsaTrabajoModule {}
