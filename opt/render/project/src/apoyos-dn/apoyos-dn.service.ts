import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApoyosDnDto } from './dto/create-apoyos-dn.dto';
import { UpdateApoyosDnDto } from './dto/update-apoyos-dn.dto';
import { ApoyosDn } from './entities/apoyos-dn.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesastresService } from 'src/desastres/desastres.service';
import { EmailService } from 'src/tools/nodemailer.service';
import { APOYOEMAIL } from 'src/tools/emails/apoyo.email';

@Injectable()
export class ApoyosDnService {
  constructor(
    @InjectRepository(ApoyosDn) private repo:Repository<ApoyosDn>,
    private desastreS:DesastresService,
    private emailService:EmailService
  ){} 

  async create(create: CreateApoyosDnDto) {
    const desastre = await this.desastreS.findOne(create.desastre)
    const saved =  this.repo.create({
      ...create,
      desastre
    }) 
    let html = APOYOEMAIL.replace('$nombre',saved.nombre);
    html = html.replace('$apoyo',desastre.titulo)
    await this.emailService.APOYO(saved,desastre.titulo,html)
    return await this.repo.save(
      saved
     )
  }

  async findAll() {
    return await this.repo.find();
  }

 async findOne(id: number) {
    return await this.repo.findOne({where:{id},relations:[]})
  }

  async update(id: number, updateParticipanteDto: UpdateApoyosDnDto) {
    const old = await this.findOne(id);
    if(!old){
      throw new NotFoundException();
    }
    const fusion = this.repo.merge(old,updateParticipanteDto as any); 
    console.log(fusion);
    await this.repo.update(id,fusion);
    return await this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} participante`;
  }
}
