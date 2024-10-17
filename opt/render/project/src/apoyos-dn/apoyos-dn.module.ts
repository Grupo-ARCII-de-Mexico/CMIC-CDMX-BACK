import { Module } from '@nestjs/common';
import { ApoyosDnService } from './apoyos-dn.service';
import { ApoyosDnController } from './apoyos-dn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApoyosDn } from './entities/apoyos-dn.entity';
import { DesastresModule } from 'src/desastres/desastres.module';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ApoyosDn
    ]),
    DesastresModule
  ],
  controllers: [ApoyosDnController],
  providers: [ApoyosDnService, EmailService]
})
export class ApoyosDnModule {}
