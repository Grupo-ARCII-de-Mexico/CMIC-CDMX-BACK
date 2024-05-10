import { Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity';
import { Repository } from 'typeorm';
import { EventoService } from 'src/evento/evento.service';
import { ParticipanteService } from 'src/participante/participante.service';
import { EmailService } from 'src/tools/nodemailer.service';
import * as qr from 'qrcode';
import * as fs from 'fs'; 
import { StripeService } from 'src/platformsPayments/services/stripe.service';
import { TipoEvento } from 'src/tools/enums/tipoEvento.enum';
import * as moment from 'moment';
import * as crypto from 'crypto-js';

const SECRET_KEY = 'CMIC_2023$';

moment.locale('es');

@Injectable()
export class BoletoService {
  constructor(
    @InjectRepository(Boleto) private repo:Repository<Boleto>,
    private eventoS:EventoService,
    private participanteS:ParticipanteService,
    private emailS:EmailService,
    private stripeS:StripeService,
  ){
  }
  async create({evento,participante,privilegio,plataformaPago,quieroFactura,costo}: CreateBoletoDto) {
    const newBoleto = this.repo.create({
      privilegio,
      plataformaPago,
      quieroFactura,
      costo 
    });
    newBoleto.active=false;
    if(evento){
      newBoleto.evento = await this.eventoS.findOneByID(evento)
    }
    if(participante){
      newBoleto.participante = await this.participanteS.findOne(participante)
    }
    const {id} = await this.repo.save(newBoleto);
    const boleto = await this.findOne(id)
      return {boleto}
   
  }

  async  findAll() {
    return await this.repo.find()
  }

  async  findOne(id: number) {
    return await this.repo.findOne({where:{id},relations:['evento','participante']})
  }

  async findOneEve(id: string) {
    return await this.repo.findOne({where:{folio:id},relations:['evento','participante']})
  }

  async update(id: number, {active,privilegio,costo, participante, checked}: UpdateBoletoDto) {
    const old = await this.findOne(id);
    let fusion;
    if(participante){
      fusion = this.repo.merge(old,{active,privilegio,costo,checked,participante:await this.participanteS.findOne(participante)});
    }else{
      fusion = this.repo.merge(old,{active,privilegio,checked,costo});
    }
    await this.repo.update(id,fusion);
    return await this.findOne(id)
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }


  createFolio(evento:number,idBoleto:number){
      return `CMIC${evento}${idBoleto.toString().padStart(4, '0')}`
  }

  async generateAndSaveQRCode(qrData:string) {
    const qrCodeOptions = {
      errorCorrectionLevel: 'H', // Puedes ajustar esto según tus necesidades
      type: 'png', // También puedes usar otros formatos como 'svg', 'jpeg', etc.
      rendererOpts: {
        quality: 0.3, // Calidad de la imagen (0-1)
      },
    };

    const qrCodeBuffer = await qr.toBuffer(qrData, qrCodeOptions);

    const filename = `qr-code-${Date.now()}.png`;
    const qrCodeFilePath = `uploads/boletos/${filename}`;
    fs.writeFileSync(qrCodeFilePath, qrCodeBuffer);
    return qrCodeFilePath;
  }

  async confirm(id:number,costo?:number,token?:string){
      const boleto = await this.findOne(id);
      boleto.folio = this.createFolio(boleto.evento.id,id);
      if(boleto.evento.tipoEvento !== TipoEvento.VIRTUAL){
        boleto.qr = await this.generateAndSaveQRCode(boleto.folio);
      }
      if(token && costo){
       const stripeResult = await this.stripeS.generatePaymentIntent(token,Number(costo),boleto.folio);
       boleto.idPago = stripeResult.id; 
       if(boleto.evento.tipoEvento !== TipoEvento.VIRTUAL){
          await this.emailS.sendEmailConfirmacion(boleto);
      }else{
          await this.emailS.sendEmailConfirmacionVirtual(boleto);
      }
      boleto.active=true;
      await this.repo.update(id,boleto);
      }
      if(!token){
        await this.emailS.sendEmailPreregistro(boleto);
      }
      return true
  }
  async confirmFree(id:number){
    const boleto = await this.findOne(id);
    boleto.folio = this.createFolio(boleto.evento.id,id);
    boleto.active = true;
    boleto.qr = await this.generateAndSaveQRCode(boleto.folio);
    await this.repo.update(id,boleto);
    if(boleto.evento.tipoEvento !== TipoEvento.VIRTUAL){
      await this.emailS.sendEventoGratis(boleto);
    }else{
      await this.emailS.sendEmailConfirmacionVirtual(boleto);
    }
      return true
    }
  
  async sendNatalia(id:number){
    const boleto = await this.findOne(id);
    await this.emailS.sendEmailConfirmacion
  }

  async addBouncher(id:number,bouncher:string) {
    const old = await this.findOne(id);
    const fusion = this.repo.merge(old,{bouncher});
    await this.repo.update(id,fusion);
    return true;
  }


  async encryptURL(id:number){
    return  btoa(crypto.AES.encrypt(id, SECRET_KEY).toString())
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
  }


}


