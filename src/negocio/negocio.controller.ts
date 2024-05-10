import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ClassSerializerInterceptor } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { CreateNegocioDto } from './dto/create-negocio.dto';
import { UpdateNegocioDto } from './dto/update-negocio.dto';
import { ContactoNegocio } from './entities/contacto-negocio.entity';
import { OportunidadNegocio } from './entities/oportunidad-negocio.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateContactoNegocioDto, UpdateContactoNegocioDto } from './dto/create-contacto-negocio';
import { CreateOportunidadNegocioDto, UpdateOportunidadNegocioDto } from './dto/create-oportunidad-negocio';

@Controller('negocio')
@UseInterceptors(ClassSerializerInterceptor)
export class NegocioController {
  constructor(private readonly negocioService: NegocioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logotipo',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/oportunidades-logotipos",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create(@UploadedFile() file: Express.Multer.File, @Body() createNegocioDto: UpdateNegocioDto) {
    if(file){
      createNegocioDto.logotipo = file.filename
    }
    createNegocioDto.documentos=[]
    return this.negocioService.create(createNegocioDto);
  }
  @Post('contacto')
  createContacto(@Body() createNegocioDto: CreateContactoNegocioDto) {
    console.log(createNegocioDto);
    
    return this.negocioService.createContacto(createNegocioDto);
  }
  @Patch('contacto/:id')
  updateContacto(@Param('id') id: string, @Body() updateNegocioDto:UpdateContactoNegocioDto ) {
    return this.negocioService.updateContacto(+id, updateNegocioDto);
  }

  @Post('oportunidad')
  createOportunidad(@Body() createNegocioDto: UpdateOportunidadNegocioDto) {  
    console.log(createNegocioDto);
    
    return this.negocioService.createOportunidad(createNegocioDto);
  }
  @Patch('oportunidad/:id')
  updateOportunidad(@Param('id') id: string,@Body() updateNegocioDto: UpdateOportunidadNegocioDto) {    
    return this.negocioService.updateOportunidad(+id, updateNegocioDto);
  }

  @Post('documentos')
  @UseInterceptors(FileInterceptor('documento',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/oportunidades-documentos",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  upload(
    @UploadedFile() file: Express.Multer.File
  ){
    return {file:file.filename}
  }

  @Post('login/:id')
  login(@Param('id') id: string,@Body('password') password:string) {
    return this.negocioService.login({identificador:id,password});
  }

  @Post('sendPassword/:id')
  password(@Param('id') id: string,@Body('email') email:string[]) {
    return this.negocioService.sendMail(id,email);
  }
  @Get()
  findAll() {
    return this.negocioService.findAll();
  }

  @Get('oportunidad')
  findAllOPO() {
    return this.negocioService.findAllOPO();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negocioService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('documento',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/oportunidades-documento",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File,@Body() updateNegocioDto: UpdateNegocioDto) {
    if(file){
      updateNegocioDto.documento = file.filename
    }
    return this.negocioService.update(+id, updateNegocioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.negocioService.remove(+id);
  }

  @Delete('oportunidad/:id')
  removeOportunidad(@Param('id') id: string) {
    return this.negocioService.removeOP(+id);
  }


  
}
