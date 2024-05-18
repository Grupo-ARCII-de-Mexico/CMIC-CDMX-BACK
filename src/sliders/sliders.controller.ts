import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/tools/s3.service';

@Controller('sliders')
export class SlidersController {
  constructor(
    private readonly slidersService: SlidersService,
  private readonly s3:S3Service) {}

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
  async create(@UploadedFile() archivo: Express.Multer.File,@Body() createSliderDto: CreateSliderDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/sliders/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createSliderDto.imagen=file;
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
  @UseInterceptors(FileInterceptor('imagen'))
  async update(@UploadedFile() archivo: Express.Multer.File,@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/sliders/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateSliderDto.imagen=file;
    }
    return this.slidersService.update(+id, updateSliderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slidersService.remove(+id);
  }
}
