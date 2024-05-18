import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('cursos')
export class CursosController {
  constructor(
    private readonly cursosService: CursosService,
  private readonly s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(@UploadedFile() archivo: Express.Multer.File,@Body() createCursoDto: CreateCursoDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/cursos/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createCursoDto.imagen=file;
    }
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  async update(@UploadedFile() archivo: Express.Multer.File, @Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/cursos/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateCursoDto.imagen=file;
    }
    return this.cursosService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}
