import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ClassSerializerInterceptor, ParseIntPipe } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { RoleProtected } from 'src/user/rol.decorator';
import { UserRoleGuard } from 'src/user/user.guard';
import { Roles } from 'src/tools/eventos.enum';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ZoomService } from 'src/tools/zoom.service';
import { AuthGuard } from '@nestjs/passport';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService, private readonly zoom:ZoomService) {}

 
  @Post()
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard() )
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/eventos",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  create( @UploadedFile() file: Express.Multer.File, @Body() createEventoDto: CreateEventoDto) {
    if(file){
      createEventoDto.imagen=file.filename;
    }
     return this.eventoService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get('/zoom/:id')
  async getZoomMeeton(@Param('id') id:string ){
    return await this.zoom.getMeetingInfo(id)
  }
  @Get(':id')
  findOneee(@Param('id') id: string) {
    return this.eventoService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/eventos",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    if(file){
      updateEventoDto.imagen=file.filename;
    }
    return this.eventoService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard(),UserRoleGuard )
  remove(@Param('id') id: string) {
    return this.eventoService.remove(+id);
  }
  @Post('/zoom')
  async zoomMeeton(@Body('password',ParseIntPipe) password : number,@Body('title') title : string, @Body('date') date : Date){
    return await this.zoom.createMeeting(password,title,date)
  }

  @Post('/ponente')
  @UseInterceptors(FileInterceptor('imagen',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/eventos-ponentes",
        filename:function(req,file,cb){
            console.log(file);
            
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  async ponente(@UploadedFile() file: Express.Multer.File){
    return {file:file?.filename ?? null};
  }


  @Post('duplicate')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard() )
  duplicate( @Body() createEventoDto: CreateEventoDto) {
    
    return this.eventoService.create(createEventoDto);
  }

}
