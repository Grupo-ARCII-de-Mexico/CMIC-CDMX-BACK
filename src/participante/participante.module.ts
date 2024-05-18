import { Module } from '@nestjs/common';
import { ParticipanteService } from './participante.service';
import { ParticipanteController } from './participante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participante } from './entities/participante.entity';
import { EstadosModule } from 'src/estados/estados.module';
import { UserModule } from 'src/user/user.module';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Participante
    ]),
    EstadosModule,
    UserModule
  ],
  controllers: [ParticipanteController],
  providers: [ParticipanteService, S3Service],
  exports:[TypeOrmModule,ParticipanteService]
})
export class ParticipanteModule {}
