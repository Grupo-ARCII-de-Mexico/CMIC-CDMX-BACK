import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {

  constructor(
    @InjectRepository(Departamento) private repo:Repository<Departamento>
  ){}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const newDepa = this.repo.create(createDepartamentoDto)
    return await this.repo.save(newDepa);
  }

  async findAll() {
    return await this.repo.find({relations:['directorios']});
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }
  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const old = await this.findOne(id);
    const fusion = this.repo.merge(old,updateDepartamentoDto);
    await this.repo.update(id,fusion);
    return await fusion;
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}


