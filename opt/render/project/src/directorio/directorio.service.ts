import { Injectable } from '@nestjs/common';
import { CreateDirectorioDto } from './dto/create-directorio.dto';
import { UpdateDirectorioDto } from './dto/update-directorio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directorio } from './entities/directorio.entity';
import { DepartamentoService } from 'src/departamento/departamento.service';

@Injectable()
export class DirectorioService {

  constructor(
    @InjectRepository(Directorio) private repo:Repository<Directorio>,
    private departamentoS:DepartamentoService
  ){}

  async create(createDirectorioDto: CreateDirectorioDto) {
    const de = await this.departamentoS.findOne(createDirectorioDto.departamento);
    const nuevo = this.repo.create({...createDirectorioDto,departamento:de})
    return await this.repo.save(nuevo) 
  }

  async findAll() {
    return `This action returns all directorio`;
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateDirectorioDto: any) {
    const old = await this.findOne(id);
    if(updateDirectorioDto.departamento){
      updateDirectorioDto.departamento = await this.departamentoS.findOne(updateDirectorioDto.departamento);
    }
    const fusion = this.repo.merge(old,updateDirectorioDto as any);
    await this.repo.update(id,fusion);
    return await fusion;
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
