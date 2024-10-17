import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participante } from './entities/participante.entity';
import { Repository } from 'typeorm';
import { EstadosService } from 'src/estados/estados.service';

@Injectable()
export class ParticipanteService {
  constructor(
    @InjectRepository(Participante) private repo:Repository<Participante>,
    private estadoService:EstadosService
  ){} 

  async create(create: CreateParticipanteDto) {
    const saved =  this.repo.create({
      ...create,
      estado: await this.estadoService.findOne(create.estado)
    }) 
    return await this.repo.save(
      saved
     )
  }

  async findAll() {
    return await this.repo.find();
  }

 async findOne(id: number) {
    return await this.repo.findOne({where:{id},relations:['estado']})
  }

  async update(id: number, updateParticipanteDto: UpdateParticipanteDto) {
    const old = await this.findOne(id);
    if(!old){
      throw new NotFoundException();
    }
    if(updateParticipanteDto.estado){
      updateParticipanteDto.estado= await this.estadoService.findOne(updateParticipanteDto.estado) as any;
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
