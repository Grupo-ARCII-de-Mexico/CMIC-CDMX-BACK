import { Injectable } from '@nestjs/common';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { Comision } from './entities/comisione.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComisionesService {
  constructor(
    @InjectRepository(Comision) private repo: Repository<Comision>
  ){}
  async create(createBoletineDto: CreateComisioneDto) {
    return await this.repo.save(this.repo.create(createBoletineDto))
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBoletineDto: UpdateComisioneDto ) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateBoletineDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
