import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BolsaParticipanteService } from './bolsa-participante.service';
import { CreateBolsaParticipanteDto } from './dto/create-bolsa-participante.dto';
import { UpdateBolsaParticipanteDto } from './dto/update-bolsa-participante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('bolsa-participante')
export class BolsaParticipanteController {
  constructor(private readonly bolsaParticipanteService: BolsaParticipanteService) {}

  @Post()
  @UseInterceptors(FileInterceptor('curriculum',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/bolsa-trabajo-curriculum",
        filename:function(req,file,cb){
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@Body() createBolsaParticipanteDto: CreateBolsaParticipanteDto, @UploadedFile() file: Express.Multer.File) {
    if(file){
      createBolsaParticipanteDto.curriculum = file.filename;
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
