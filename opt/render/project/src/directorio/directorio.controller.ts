import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorioService } from './directorio.service';
import { CreateDirectorioDto } from './dto/create-directorio.dto';
import { UpdateDirectorioDto } from './dto/update-directorio.dto';

@Controller('directorio')
export class DirectorioController {
  constructor(private readonly directorioService: DirectorioService) {}

  @Post()
  create(@Body() createDirectorioDto: CreateDirectorioDto) {
    return this.directorioService.create(createDirectorioDto);
  }

  @Get()
  findAll() {
    return this.directorioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorioDto: UpdateDirectorioDto) {
    return this.directorioService.update(+id, updateDirectorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorioService.remove(+id);
  }
}
