import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('boletines')
export class BoletinesController {
  constructor(private readonly boletinesService: BoletinesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/boletines",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File, @Body() createBoletineDto: CreateBoletineDto) {
    if(file){
      createBoletineDto.imagen=file.filename;
    }
    return this.boletinesService.create(createBoletineDto);
  }

  @Get()
  findAll() {
    return this.boletinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletinesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/boletines",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateBoletineDto: UpdateBoletineDto) {
    if(file){
      updateBoletineDto.imagen=file.filename;
    }
    return this.boletinesService.update(+id, updateBoletineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boletinesService.remove(+id);
  }

  
  @Post('/images')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/boletines",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  images(@UploadedFile() file: Express.Multer.File,) {
    return file.filename
  }
}
