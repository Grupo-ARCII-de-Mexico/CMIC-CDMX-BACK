import { Module } from '@nestjs/common';
import { BoletoService } from './boleto.service';
import { BoletoController } from './boleto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity';
import { EventoModule } from 'src/evento/evento.module';
import { ParticipanteModule } from 'src/participante/participante.module';
import { UserModule } from 'src/user/user.module';
import { StripeService } from 'src/platformsPayments/services/stripe.service';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  imports:[
    EventoModule,
    TypeOrmModule.forFeature([
      Boleto
    ]),
    ParticipanteModule,
    UserModule

  ],
  controllers: [BoletoController],
  providers: [BoletoService,StripeService,EmailService]
})
export class BoletoModule {}
