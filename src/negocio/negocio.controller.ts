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
import { S3Service } from 'src/tools/s3.service';

@Controller('negocio')
@UseInterceptors(ClassSerializerInterceptor)
export class NegocioController {
  constructor(private readonly negocioService: NegocioService, private s3: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('logotipo'))
  async create(@UploadedFile() archivo: Express.Multer.File, @Body() createNegocioDto: UpdateNegocioDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/oportunidades-logotipo/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createNegocioDto.logotipo = file
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
  @UseInterceptors(FileInterceptor('documento'))
  async upload(
    @UploadedFile() file: Express.Multer.File
  ){
    return await this.s3.uploadFile(file.buffer,'uploads/oportunidades-documentos/'+file.filename+ file.mimetype.split('/')[1])
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
  async update(@Param('id') id: string, @UploadedFile() archivo: Express.Multer.File,@Body() updateNegocioDto: UpdateNegocioDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/oportunidades-documento/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateNegocioDto.documento = file
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
