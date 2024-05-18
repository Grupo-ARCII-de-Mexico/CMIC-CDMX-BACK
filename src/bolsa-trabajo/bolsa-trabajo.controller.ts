import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BolsaTrabajoService } from './bolsa-trabajo.service';
import { CreateBolsaTrabajoDto } from './dto/create-bolsa-trabajo.dto';
import { UpdateBolsaTrabajoDto } from './dto/update-bolsa-trabajo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';


@Controller('bolsa-trabajo')
export class BolsaTrabajoController {
  constructor(private readonly bolsaTrabajoService: BolsaTrabajoService, private readonly s3:S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  async create(@Body() createBolsaTrabajoDto: CreateBolsaTrabajoDto, @UploadedFile() archivo: Express.Multer.File,) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/bolsa-trabajo/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createBolsaTrabajoDto.foto=file;
    }
    return this.bolsaTrabajoService.create(createBolsaTrabajoDto);
  }

  @Get()
  findAll() {
    return this.bolsaTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolsaTrabajoService.FindByIdentificador(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  async update(@Param('id') id: string, @Body() updateBolsaTrabajoDto: UpdateBolsaTrabajoDto, @UploadedFile() archivo: Express.Multer.File,) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/bolsa-trabajo/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateBolsaTrabajoDto.foto=file;
    }
    return this.bolsaTrabajoService.update(+id, updateBolsaTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolsaTrabajoService.remove(+id);
  }
}
