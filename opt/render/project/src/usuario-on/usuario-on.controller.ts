import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioOnService } from './usuario-on.service';
import { CreateUsuarioOnDto } from './dto/create-usuario-on.dto';
import { UpdateUsuarioOnDto } from './dto/update-usuario-on.dto';

@Controller('usuario-on')
export class UsuarioOnController {
  constructor(private readonly usuarioOnService: UsuarioOnService) {}

  @Post()
  create(@Body() createUsuarioOnDto: CreateUsuarioOnDto) {
    return this.usuarioOnService.create(createUsuarioOnDto);
  }

  @Get()
  findAll() {
    return this.usuarioOnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioOnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioOnDto: UpdateUsuarioOnDto) {
    return this.usuarioOnService.update(+id, updateUsuarioOnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioOnService.remove(+id);
  }
}
