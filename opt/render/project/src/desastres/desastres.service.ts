import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesastreDto } from './dto/create-desastre.dto';
import { UpdateDesastreDto } from './dto/update-desastre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Desastre } from './entities/desastre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DesastresService {
  constructor(
   @InjectRepository(Desastre) private repo:Repository<Desastre>
  ){}
  async create(createDesastreDto: CreateDesastreDto) {
    const saved = this.repo.create(createDesastreDto);
    return await this.repo.save(saved)
  }

  async findAll() {
    return await this.repo.find({relations:['apoyos']});
  }

 async findOne(id: number) {
    return await this.repo.findOne({where:{id},relations:[]})
  }

  async findOneIdentificador(id: string) {
    return await this.repo.findOneBy({identificador:id})
  }

  async update(id: number, updateParticipanteDto: UpdateDesastreDto) {
    const old = await this.findOne(+id);
    if(!old){
      throw new NotFoundException();
    }
    const fusion = this.repo.merge(old,updateParticipanteDto); 
    await this.repo.update(id,fusion);
    return await this.repo.findOne({where:{id},relations:['apoyos']})
  }

 async remove(id: number) {
    return await  this.repo.delete(id)
  }
}
