import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { BoletinesService } from './boletines.service';
import { CreateBoletineDto } from './dto/create-boletine.dto';
import { UpdateBoletineDto } from './dto/update-boletine.dto';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/tools/s3.service';

@Controller('boletines')
export class BoletinesController {
  constructor(private readonly boletinesService: BoletinesService, private readonly s3:S3Service ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('imagenes',10))
  async create(@UploadedFiles() imagenes: Array<Express.Multer.File>, @Body() createBoletineDto: CreateBoletineDto) {
    const images = []
    if(imagenes.length> 0){
      for(const img of imagenes){
        const {file} = await this.s3.uploadFile(img.buffer,'uploads/boletines'+img.filename+ img.mimetype.split('/')[1])
        images.push(file)
      }
      createBoletineDto.imagenes = images;
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
  @UseInterceptors(FilesInterceptor('imagenes',10))
 async update(@UploadedFiles() imagenes: Array<Express.Multer.File>, @Param('id') id: string, @Body() updateBoletineDto: UpdateBoletineDto) {
    const images = []
    if(imagenes.length> 0){
      for(const img of imagenes){
        const {file} = await this.s3.uploadFile(img.buffer,'uploads/boletines'+img.filename+ img.mimetype.split('/')[1])
        images.push(file)
      }
      updateBoletineDto.imagenes = [...imagenes,...images];
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
  images(@UploadedFiles() file: Express.Multer.File,) {
    return file.filename
  }
}
