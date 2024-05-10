import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisionesService: ComisionesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/comisiones",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File,@Body() createComisioneDto: CreateComisioneDto) {
    if(file){
      createComisioneDto.imagen=file.filename;
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
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/comisiones",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateComisioneDto: UpdateComisioneDto) {
    if(file){
      updateComisioneDto.imagen=file.filename;
    }
    return this.comisionesService.update(+id, updateComisioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionesService.remove(+id);
  }
}
