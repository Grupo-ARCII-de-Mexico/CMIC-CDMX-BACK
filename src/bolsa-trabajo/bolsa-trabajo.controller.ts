import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BolsaTrabajoService } from './bolsa-trabajo.service';
import { CreateBolsaTrabajoDto } from './dto/create-bolsa-trabajo.dto';
import { UpdateBolsaTrabajoDto } from './dto/update-bolsa-trabajo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('bolsa-trabajo')
export class BolsaTrabajoController {
  constructor(private readonly bolsaTrabajoService: BolsaTrabajoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/bolsa-trabajo-logos",
        filename:function(req,file,cb){
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@Body() createBolsaTrabajoDto: CreateBolsaTrabajoDto, @UploadedFile() file: Express.Multer.File,) {
    if(file){
      createBolsaTrabajoDto.foto=file.filename;
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
  @UseInterceptors(FileInterceptor('foto',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/bolsa-trabajo-logos",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@Param('id') id: string, @Body() updateBolsaTrabajoDto: UpdateBolsaTrabajoDto, @UploadedFile() file: Express.Multer.File,) {
    if(file){
      updateBolsaTrabajoDto.foto=file.filename;
    }
    return this.bolsaTrabajoService.update(+id, updateBolsaTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolsaTrabajoService.remove(+id);
  }
}
