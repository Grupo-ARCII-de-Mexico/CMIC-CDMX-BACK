import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BolsaParticipanteService } from './bolsa-participante.service';
import { CreateBolsaParticipanteDto } from './dto/create-bolsa-participante.dto';
import { UpdateBolsaParticipanteDto } from './dto/update-bolsa-participante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@Controller('bolsa-participante')
export class BolsaParticipanteController {
  constructor(private readonly bolsaParticipanteService: BolsaParticipanteService, private readonly s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('curriculum'))
  async create(@Body() createBolsaParticipanteDto: CreateBolsaParticipanteDto, @UploadedFile() file: Express.Multer.File) {
    if(file){
      const r = await this.s3.uploadFile(file.buffer,'uploads/bolsa-participante/'+file.filename+ file.mimetype.split('/')[1])
      createBolsaParticipanteDto.curriculum = r.file;
    }
    return this.bolsaParticipanteService.create(createBolsaParticipanteDto);
  }

  @Get()
  findAll() {
    return this.bolsaParticipanteService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBolsaParticipanteDto: UpdateBolsaParticipanteDto) {
    return this.bolsaParticipanteService.update(+id, updateBolsaParticipanteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolsaParticipanteService.findOne(+id);
  }


}
