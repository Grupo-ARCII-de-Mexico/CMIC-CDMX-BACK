import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLicitacioneDto } from './dto/create-licitacione.dto';
import { UpdateLicitacioneDto } from './dto/update-licitacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Licitacione } from './entities/licitacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicitacionesService {
  constructor(
    @InjectRepository(Licitacione) private  repo: Repository<Licitacione>
  ){}
  async create(createLicitacioneDto: CreateLicitacioneDto) {
    const nuevo = this.repo.create(createLicitacioneDto);
    return await this.repo.save(nuevo)
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id})
  }

  async update(id: number, updateLicitacioneDto: UpdateLicitacioneDto) {
    const old = await this.findOne(id)
    const fusion = this.repo.merge(old,updateLicitacioneDto);
    await this.repo.update(id,fusion);
    return await this.findOne(id)
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }

async createMassive( createLicitacioneDto: CreateLicitacioneDto[] ){
 try {
  const updates: Promise<any>[] = [];
  const updatesRegisters: Licitacione[] = []
  const inserts: Licitacione[] = [];
  let i = 0;
  for (const licitacion of createLicitacioneDto) {
    const old = await this.repo.findOneBy({ noProcedimiento: licitacion.noProcedimiento });
    if (old) {
      const fusion = this.repo.merge(old, licitacion);
      updates.push(this.repo.update(old.id, fusion));
      updatesRegisters.push(fusion);
    } else {
      inserts.push((this.repo.create(licitacion)));
    }
  }

  await Promise.all([...updates]);
  const nuevos = await this.repo.save(inserts)
  return {nuevos,updates:updatesRegisters};
 } catch (error) {
  return  {nuevos:[],updates:[]};
 }
}

}
