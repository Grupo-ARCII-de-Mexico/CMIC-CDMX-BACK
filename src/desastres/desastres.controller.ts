import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DesastresService } from './desastres.service';
import { CreateDesastreDto } from './dto/create-desastre.dto';
import { UpdateDesastreDto } from './dto/update-desastre.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('desastres')
export class DesastresController {
  constructor(private readonly desastresService: DesastresService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/apoyos-dn",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create( @UploadedFile() file: Express.Multer.File, @Body() createDesastreDto: CreateDesastreDto) {
    if(file){
      createDesastreDto.imagen = file.filename
    }
    return this.desastresService.create(createDesastreDto);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/apoyos-dn",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@Param('id') id: string, @Body() updateDesastreDto: UpdateDesastreDto) {
    return this.desastresService.update(+id, updateDesastreDto);
  }

  @Get()
  findAll() {
    return this.desastresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desastresService.findOneIdentificador(id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desastresService.remove(+id);
  }
}
