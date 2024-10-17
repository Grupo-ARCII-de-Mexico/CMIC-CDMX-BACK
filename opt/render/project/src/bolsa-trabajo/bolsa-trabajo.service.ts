import { Injectable } from '@nestjs/common';
import { CreateBolsaTrabajoDto } from './dto/create-bolsa-trabajo.dto';
import { UpdateBolsaTrabajoDto } from './dto/update-bolsa-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BolsaTrabajo } from './entities/bolsa-trabajo.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class BolsaTrabajoService {

  constructor(
    @InjectRepository(BolsaTrabajo) private repo:Repository<BolsaTrabajo>
  ){}

  async create(createBolsaTrabajoDto: CreateBolsaTrabajoDto) {
    return await this.repo.save(this.repo.create({...createBolsaTrabajoDto, identificador:uuidv4()}));
  }

  async findAll() {
    return await this.repo.find({where:{active:true}, relations:['postulantes']})
  }

  async FindByIdentificador(id: string) {
    return await this.repo.findOneBy({identificador:id});
  }
  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBolsaTrabajoDto: UpdateBolsaTrabajoDto) {
    const old = await this.findOne(id); 
    const fusion = this.repo.merge(old,updateBolsaTrabajoDto);
    await this.repo.update(id,fusion)
    return fusion;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
