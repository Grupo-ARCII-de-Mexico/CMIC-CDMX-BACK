import { Module } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { NegocioController } from './negocio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity';
import { ContactoNegocio } from './entities/contacto-negocio.entity';
import { OportunidadNegocio } from './entities/oportunidad-negocio.entity';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Negocio,
      ContactoNegocio,
      OportunidadNegocio
    ])
  ],
  controllers: [NegocioController],
  providers: [NegocioService,EmailService]
})
export class NegocioModule {}
