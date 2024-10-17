import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicitacionesService } from './licitaciones.service';
import { CreateLicitacioneDto } from './dto/create-licitacione.dto';
import { UpdateLicitacioneDto } from './dto/update-licitacione.dto';

@Controller('licitaciones')
export class LicitacionesController {
  constructor(private readonly licitacionesService: LicitacionesService) {}

  @Post()
  create(@Body() createLicitacioneDto: CreateLicitacioneDto) {
    return this.licitacionesService.create(createLicitacioneDto);
  }

  @Post('massive')
  createMasive(@Body() createLicitacioneDto: CreateLicitacioneDto[]) {
    return this.licitacionesService.createMassive(createLicitacioneDto);
  }


  @Get()
  findAll() {
    return this.licitacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licitacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicitacioneDto: UpdateLicitacioneDto) {
    return this.licitacionesService.update(+id, updateLicitacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licitacionesService.remove(+id);
  }
}
