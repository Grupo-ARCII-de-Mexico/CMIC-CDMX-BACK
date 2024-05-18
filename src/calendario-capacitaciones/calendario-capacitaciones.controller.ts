import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CalendarioCapacitacionesService } from './calendario-capacitaciones.service';
import { CreateCalendarioCapacitacioneDto } from './dto/create-calendario-capacitacione.dto';
import { UpdateCalendarioCapacitacioneDto } from './dto/update-calendario-capacitacione.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('calendario-capacitaciones')
export class CalendarioCapacitacionesController {
  constructor(private readonly calendarioCapacitacionesService: CalendarioCapacitacionesService, private s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() archivo: Express.Multer.File, @Body() createCalendarioCapacitacioneDto: CreateCalendarioCapacitacioneDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/bolsa-trabajo/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createCalendarioCapacitacioneDto.archivo=file;
    }
    return this.calendarioCapacitacionesService.create(createCalendarioCapacitacioneDto);
  }

  @Get()
  findAll() {
    return this.calendarioCapacitacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarioCapacitacionesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() archivo: Express.Multer.File,@Param('id') id: string, @Body() updateCalendarioCapacitacioneDto: UpdateCalendarioCapacitacioneDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/bolsa-trabajo/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateCalendarioCapacitacioneDto.archivo=file;
    }
    return this.calendarioCapacitacionesService.update(+id, updateCalendarioCapacitacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarioCapacitacionesService.remove(+id);
  }
}
