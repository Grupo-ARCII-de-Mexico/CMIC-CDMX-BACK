import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario) private repo: Repository<Comentario>
  ){}
  async create(createBoletineDto: CreateComentarioDto) {
    return await this.repo.save(this.repo.create(createBoletineDto))
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({id});
  }

  async update(id: number, updateBoletineDto: UpdateComentarioDto) {
    const old = await this.repo.findOneBy({id});
    const fusion = this.repo.merge(old,updateBoletineDto);
    await this.repo.update(id,fusion);
    return  await this.repo.findOneBy({id}) ;
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
