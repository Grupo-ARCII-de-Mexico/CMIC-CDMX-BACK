import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { AfiliadosSearchService } from 'src/tools/afiliados.service';
import { UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('afiliados')
export class AfiliadosController {
  constructor(private readonly afiliadosService: AfiliadosService, private readonly afiliadosSearchService:AfiliadosSearchService) {}

  @Post()
  create(@Body() createAfiliadoDto: CreateAfiliadoDto) {
    return this.afiliadosService.create(createAfiliadoDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.afiliadosService.masive(file);
  }
  

  @Get()
  findAll() {
    return this.afiliadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.afiliadosService.search(id);
  }

  @Get('id/:id')
  findOnebyID(@Param('id') id: string) {
    return this.afiliadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAfiliadoDto: UpdateAfiliadoDto) {
    return this.afiliadosService.update(+id, updateAfiliadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.afiliadosService.remove(+id);
  }

  @Post('cumpleanos/:id')
  cumpleanos(@Param('id') id: string) {
    return this.afiliadosService.mandarCorreoCumpleanos(+id);
  }

  @Post('aniversario/:id')
  aniversario(@Param('id') id: string) {
    return this.afiliadosService.mandarCorreoAniversario(+id);
  }

}

