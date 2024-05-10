import { Injectable } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

@Injectable()
export class ContactoService {
  create(createContactoDto: CreateContactoDto) {
    return 'This action adds a new contacto';
  }

  findAll() {
    return `This action returns all contacto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contacto`;
  }

  update(id: number, updateContactoDto: UpdateContactoDto) {
    return `This action updates a #${id} contacto`;
  }

  remove(id: number) {
    return `This action removes a #${id} contacto`;
  }
}
