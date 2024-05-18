import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisionesService: ComisionesService, private readonly s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(@UploadedFile() archivo: Express.Multer.File,@Body() createComisioneDto: CreateComisioneDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/comisiones/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createComisioneDto.imagen=file;
    }
    return this.comisionesService.create(createComisioneDto);
  }

  @Get()
  findAll() {
    return this.comisionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comisionesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  async update(@UploadedFile() archivo: Express.Multer.File,@Param('id') id: string, @Body() updateComisioneDto: UpdateComisioneDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/comisiones/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateComisioneDto.imagen=file;
    }
    return this.comisionesService.update(+id, updateComisioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionesService.remove(+id);
  }
}
