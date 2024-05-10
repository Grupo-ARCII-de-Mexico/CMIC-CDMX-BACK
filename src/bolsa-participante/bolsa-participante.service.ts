import { Injectable } from '@nestjs/common';
import { CreateBolsaParticipanteDto } from './dto/create-bolsa-participante.dto';
import { UpdateBolsaParticipanteDto } from './dto/update-bolsa-participante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BolsaParticipante } from './entities/bolsa-participante.entity';
import { Repository } from 'typeorm';
import { BolsaTrabajoService } from 'src/bolsa-trabajo/bolsa-trabajo.service';
import { EmailService } from 'src/tools/nodemailer.service';

@Injectable()
export class BolsaParticipanteService {
  constructor(
    @InjectRepository(BolsaParticipante) private repo:Repository<BolsaParticipante>,
    private bolsaS:BolsaTrabajoService,
    private email:EmailService
  ){}

  async create(createBolsaTrabajoDto: CreateBolsaParticipanteDto) {
    const trabajo = await this.bolsaS.findOne(createBolsaTrabajoDto.trabajo) ?? null;
    const nuevo = await this.repo.save(this.repo.create({...createBolsaTrabajoDto,trabajo}));
    await this.email.sendEmailPostulante(nuevo);
    return nuevo;
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBolsaTrabajoDto: UpdateBolsaParticipanteDto) {
    const old = await this.findOne(id); 
    const fusion = this.repo.merge(old,updateBolsaTrabajoDto as any);
    await this.repo.update(id,fusion)
    return fusion;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
