import { Injectable } from '@nestjs/common';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Boletin } from './entities/boletine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoletinesService {
  constructor(
    @InjectRepository(Boletin) private repo: Repository<Boletin>
  ){}
  async create(createBoletineDto: CreateBoletineDto) {
    return await this.repo.save(this.repo.create(createBoletineDto))
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOneBy({identificador:id});
  }

  async update(id: number, updateBoletineDto: UpdateBoletineDto) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateBoletineDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
