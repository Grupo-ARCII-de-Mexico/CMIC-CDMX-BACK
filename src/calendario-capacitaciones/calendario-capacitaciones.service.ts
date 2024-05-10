import { Injectable } from '@nestjs/common';
import { CreateCalendarioCapacitacioneDto } from './dto/create-calendario-capacitacione.dto';
import { UpdateCalendarioCapacitacioneDto } from './dto/update-calendario-capacitacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarioCapacitacione } from './entities/calendario-capacitacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CalendarioCapacitacionesService {
  constructor(
    @InjectRepository(CalendarioCapacitacione) private repo:Repository<CalendarioCapacitacione>
  ){}
  async create(createDelegacionDto: CreateCalendarioCapacitacioneDto) {
    return await this.repo.save(this.repo.create(createDelegacionDto))
  }

 async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await  this.repo.findOneBy({id});
  }

  async update(id: number, updateDelegacionDto: UpdateCalendarioCapacitacioneDto) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateDelegacionDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
