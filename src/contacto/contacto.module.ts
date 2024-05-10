import { Module } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoController } from './contacto.controller';
import { EmailService } from 'src/tools/nodemailer.service';

@Module({
  controllers: [ContactoController],
  providers: [ContactoService,EmailService]
})
export class ContactoModule {}
