import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { ZoomService } from 'src/tools/zoom.service';
import { UserModule } from 'src/user/user.module';
import { S3Service } from 'src/tools/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Evento
    ]),
    UserModule
  ],
  controllers: [EventoController],
  providers: [EventoService,ZoomService, S3Service],
  exports:[TypeOrmModule,EventoService]
})
export class EventoModule {}
