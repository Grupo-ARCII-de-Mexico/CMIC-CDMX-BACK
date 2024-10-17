import { Injectable } from '@nestjs/common';
import { CreateDelegacionDto } from './dto/create-delegacion.dto';
import { UpdateDelegacionDto } from './dto/update-delegacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delegacion } from './entities/delegacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DelegacionService {
  constructor(
    @InjectRepository(Delegacion) private repo:Repository<Delegacion>
  ){}
  async create(createDelegacionDto: CreateDelegacionDto) {
    return await this.repo.save(this.repo.create(createDelegacionDto))
  }

 async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await  this.repo.findOneBy({id});
  }

  async update(id: number, updateDelegacionDto: UpdateDelegacionDto) {
    await this.repo.update(id,{ciudad:updateDelegacionDto.ciudad});
    return await this.findOne(id)
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
