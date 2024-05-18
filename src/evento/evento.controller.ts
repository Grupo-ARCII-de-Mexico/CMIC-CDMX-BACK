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
import { S3Service } from 'src/tools/s3.service';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService, private readonly zoom:ZoomService, private s3:S3Service) {}

 
  @Post()
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard() )
  @UseInterceptors(FileInterceptor('imagen'))
  async create( @UploadedFile() archivo: Express.Multer.File, @Body() createEventoDto: CreateEventoDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/eventos/'+archivo.filename+ archivo.mimetype.split('/')[1])
      createEventoDto.imagen=file;
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
  @UseInterceptors(FileInterceptor('imagen'))
  async update(@UploadedFile() archivo: Express.Multer.File,@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    if(archivo){
      const {file} = await this.s3.uploadFile(archivo.buffer,'uploads/eventos/'+archivo.filename+ archivo.mimetype.split('/')[1])
      updateEventoDto.imagen=file;
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
  @UseInterceptors(FileInterceptor('imagen'))
  async ponente(@UploadedFile() file: Express.Multer.File){
    return await this.s3.uploadFile(file.buffer,'uploads/ponentes/'+file.filename+ file.mimetype.split('/')[1])
  }


  @Post('duplicate')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard() )
  duplicate( @Body() createEventoDto: CreateEventoDto) {
    
    return this.eventoService.create(createEventoDto);
  }

}
