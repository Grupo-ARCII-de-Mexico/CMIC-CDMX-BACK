import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ParticipanteService } from './participante.service';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('participante')
export class ParticipanteController {
  constructor(private readonly participanteService: ParticipanteService) {}

  @Post()
  @UseInterceptors(FileInterceptor('evidencia',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/evidencia",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File, @Body() createParticipanteDto: CreateParticipanteDto) {
    if(file){
      createParticipanteDto.evidencia = file.filename;
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
