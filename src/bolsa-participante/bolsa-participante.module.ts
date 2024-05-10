import { Module } from '@nestjs/common';
import { BolsaParticipanteService } from './bolsa-participante.service';
import { BolsaParticipanteController } from './bolsa-participante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BolsaParticipante } from './entities/bolsa-participante.entity';
import { BolsaTrabajoModule } from 'src/bolsa-trabajo/bolsa-trabajo.module';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([BolsaParticipante]),
    BolsaTrabajoModule
  ],
  controllers: [BolsaParticipanteController],
  providers: [BolsaParticipanteService, EmailService]
})
export class BolsaParticipanteModule {}
