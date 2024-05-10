import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { access } from 'fs';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(Evento) private repo:Repository<Evento>
  ){

  }

  async create(createEventoDto: CreateEventoDto) {
    return await this.repo.save(this.repo.create(createEventoDto));
  }

  async findAll() {
    try {    
      return await this.repo.find({relations:['boletos','boletos.participante','boletos.participante.estado']});
    } catch (error) {
    }
  }

  async findOne(id: string) {
    try {
      const find = await this.repo.findOne({where:{identificador:id},relations:['boletos']});
      if((find.boletos.length >= find.cupo) && find.tieneCupoMaximo){
        find.active = false;
      }
      if(!find){
        throw new NotFoundException()
      }
      delete find.boletos;
      return find
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException()
    }
  }

  async findOneByID(id: number) {
    try {
      const find = await this.repo.findOneBy({id});
      if(!find){
        throw new NotFoundException()
      }
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    try {
      const old = await this.repo.findOneBy({id});
      if(updateEventoDto.zoomPassword === null || updateEventoDto.zoomPassword === 'null'){
        delete updateEventoDto.zoomPassword;
      }
      const fusion = this.repo.merge(old,updateEventoDto);
      await this.repo.update(id,fusion)
      return fusion;
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    return await this.repo.delete(id)
  }
}
