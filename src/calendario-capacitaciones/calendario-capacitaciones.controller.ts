import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CalendarioCapacitacionesService } from './calendario-capacitaciones.service';
import { CreateCalendarioCapacitacioneDto } from './dto/create-calendario-capacitacione.dto';
import { UpdateCalendarioCapacitacioneDto } from './dto/update-calendario-capacitacione.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('calendario-capacitaciones')
export class CalendarioCapacitacionesController {
  constructor(private readonly calendarioCapacitacionesService: CalendarioCapacitacionesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/calendarios",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File, @Body() createCalendarioCapacitacioneDto: CreateCalendarioCapacitacioneDto) {
    if(file){
      createCalendarioCapacitacioneDto.archivo = file.filename;
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
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/calendarios",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateCalendarioCapacitacioneDto: UpdateCalendarioCapacitacioneDto) {
    if(file){
      updateCalendarioCapacitacioneDto.archivo = file.filename;
    }
    return this.calendarioCapacitacionesService.update(+id, updateCalendarioCapacitacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarioCapacitacionesService.remove(+id);
  }
}
