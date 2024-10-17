import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sliders')
export class SlidersController {
  constructor(private readonly slidersService: SlidersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/sliders",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File,@Body() createSliderDto: CreateSliderDto) {
    if(file){
      createSliderDto.imagen=file.filename;
    }
   if(typeof(createSliderDto.blur) === 'string'){
        if(createSliderDto.blur === 'false'){
          createSliderDto.blur = false
        }else{
          createSliderDto.blur=true
        }
   }
    return this.slidersService.create(createSliderDto);
  }

  @Get()
  findAll() {
    return this.slidersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slidersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/sliders",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto) {
    if(file){
      updateSliderDto.imagen=file.filename;
    }
    return this.slidersService.update(+id, updateSliderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slidersService.remove(+id);
  }
}
