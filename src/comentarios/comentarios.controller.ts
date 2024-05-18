import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('comentarios')
export class ComentariosController {
  constructor(
    private readonly comentariosService: ComentariosService,
    private readonly s3:S3Service
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(@UploadedFile() archivo: Express.Multer.File,@Body() createComentarioDto: CreateComentarioDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/comentarios/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createComentarioDto.imagen=file;
    }
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  async update(@UploadedFile() archivo: Express.Multer.File,@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/comentarios/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateComentarioDto.imagen=file;
    }
    return this.comentariosService.update(+id, updateComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(+id);
  }
}
