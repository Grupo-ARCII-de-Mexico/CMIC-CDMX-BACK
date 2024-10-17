import { Injectable } from '@nestjs/common';
import { Boleto } from 'src/boleto/entities/boleto.entity';
import { EventoVirtualFree } from 'src/tools/emails/eventoVirtual.email';

@Injectable()
export class EmailService {

  EventoVirtual(boleto:Boleto) {
    let html;
    if(boleto.evento.esGratis){
   
    }
  }
}
