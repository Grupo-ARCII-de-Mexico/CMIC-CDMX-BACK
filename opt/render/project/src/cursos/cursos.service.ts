import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso) private repo: Repository<Curso>
  ){}
  async create(createBoletineDto: CreateCursoDto) {
    return await this.repo.save(this.repo.create(createBoletineDto))
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBoletineDto: UpdateCursoDto) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateBoletineDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
