import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ParticipanteService } from './participante.service';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('participante')
export class ParticipanteController {
  constructor(private readonly participanteService: ParticipanteService, private s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('evidencia'))
  async create(@UploadedFile() archivo: Express.Multer.File, @Body() createParticipanteDto: CreateParticipanteDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/evidencia/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createParticipanteDto.evidencia = file;
    }
    return this.participanteService.create(createParticipanteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipanteDto: UpdateParticipanteDto) {
    return this.participanteService.update(+id, updateParticipanteDto);
  }

  @Get()
  findAll() {
    console.log('entree');
    
    return this.participanteService.findAll();
  }
  /* 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participanteService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participanteService.remove(+id);
  } */
}
