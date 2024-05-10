import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado) private repo: Repository<Estado>
  ){}
 async create(createEstadoDto: string[]) {
  const estados = [];
  for(const estado of createEstadoDto ){
    estados.push(
      this.repo.create({nombre:estado})
    )
  }
    return await this.repo.save(estados);
  }

 async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id})
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
