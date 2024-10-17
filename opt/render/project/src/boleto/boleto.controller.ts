import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';
import { UserRoleGuard } from 'src/user/user.guard';
import { Roles } from 'src/tools/eventos.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/user/rol.decorator';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('boleto')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Post()
  create(@Body() createBoletoDto: CreateBoletoDto) {
 
    return this.boletoService.create(createBoletoDto);
  }

  @Get()

  findAll() {
    return this.boletoService.findAll();
  }

  @Get(':id')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard(),UserRoleGuard )
  findOne(@Param('id') id: string) {
    return this.boletoService.findOne(+id);
  }

  @Get('/evento/:id')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard(),UserRoleGuard )
  findOneevento(@Param('id') id: string) {
    return this.boletoService.findOneEve(id);
  }

  @Patch(':id')
 
  update(@Param('id') id: string, @Body() updateBoletoDto: UpdateBoletoDto) {
    return this.boletoService.update(+id, updateBoletoDto);
  } 

  @Delete(':id')
  @RoleProtected( Roles.ADMIN,Roles.GERENTE,Roles.COLABORADOR )
  @UseGuards( AuthGuard(),UserRoleGuard )
  remove(@Param('id') id: string) {
    return this.boletoService.remove(+id);
  }

  @Post('confirm/:id')
  pay(@Param('id') id: number,@Body('token') token?: string,@Body('costo') costo?:number) {
 
    return this.boletoService.confirm(id,costo,token);
  }

  @Post('confirm-free/:id')
  free(@Param('id') id: number) {
 
    return this.boletoService.confirmFree(id);
  }


  @Post('natalia/:id')
  natalia(@Body('id') id: number) {
    return this.boletoService.sendNatalia(id);
  }

  @Patch('bouncher/:id')
  @UseInterceptors(FileInterceptor('bouncher',{
    fileFilter: function (req,file,cb){

        cb(null,true)
    },
    storage:diskStorage({
        destination:"./uploads/bouncher",
        filename:function(req,file,cb){
            cb(null, Date.now() +'.'+ file.mimetype.split('/')[1])
           // cb(null,file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
        }
    })

}))
  bouncher(@Param('id',ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File, ) {
 
    return this.boletoService.addBouncher(id,file.filename);
  }
}
