import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { EmailService } from 'src/tools/nodemailer.service';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: EmailService) {}

  @Post()
  async create(@Body() createContactoDto: CreateContactoDto) {
    return await this.contactoService.CONTACTO(createContactoDto);
  }

}
