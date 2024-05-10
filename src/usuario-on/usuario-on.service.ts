import { Injectable } from '@nestjs/common';
import { CreateUsuarioOnDto } from './dto/create-usuario-on.dto';
import { UpdateUsuarioOnDto } from './dto/update-usuario-on.dto';

@Injectable()
export class UsuarioOnService {
  create(createUsuarioOnDto: CreateUsuarioOnDto) {
    return 'This action adds a new usuarioOn';
  }

  findAll() {
    return `This action returns all usuarioOn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioOn`;
  }

  update(id: number, updateUsuarioOnDto: UpdateUsuarioOnDto) {
    return `This action updates a #${id} usuarioOn`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioOn`;
  }
}
