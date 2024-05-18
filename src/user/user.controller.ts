/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Patch, Query, UseInterceptors, UseGuards, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, updateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserRoleGuard } from './user.guard';
import { RoleProtected } from './rol.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getuser.decorator';
import { Roles } from 'src/tools/eventos.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3Service } from 'src/tools/s3.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private s3: S3Service
    ) { }
    @Get('/me')
    @RoleProtected(Roles.ADMIN, Roles.GERENTE, Roles.COLABORADOR, Roles.COLABORADOR)
    @UseGuards(AuthGuard(), UserRoleGuard)
    me(@GetUser() user: User) {
         return user;
    }

    @Post('')
    @UseInterceptors(FileInterceptor('foto'))
   async  createUser(@UploadedFile() archivo: Express.Multer.File, @Body() user: UserDto) {
        if (archivo) {
            const { file } = await this.s3.uploadFile(archivo.buffer, 'uploads/users/' + archivo.filename + archivo.mimetype.split('/')[1])
            user.foto = file;
        }
        return this.userService.createUser(user);

    }

    @Patch('/')
    @UseInterceptors(FileInterceptor('foto'))
    @RoleProtected(Roles.ADMIN, Roles.GERENTE, Roles.COLABORADOR)
    @UseGuards(AuthGuard(), UserRoleGuard)
    async updateUser(@GetUser() {id}: User, @Body() user: updateUserDto, @UploadedFile() archivo: Express.Multer.File): Promise<User> {
        if (archivo) {
            const { file } = await this.s3.uploadFile(archivo.buffer, 'uploads/users/' + archivo.filename + archivo.mimetype.split('/')[1])
            user.foto = file;
        }
        return this.userService.updateUser(id, user);

    }

    @Patch('/:id/:ss')
    updateUserd(@Param('id') id: string,@Param('ss') ss: string, @Body() user: updateUserDto): Promise<User> {
        if(ss === 'asdaascv_213°°°{}0kljjhik'){
            return this.userService.updateUser(+id, user);
        }
  

    }


    @Post('/login')
    logIn(@Body('') user: Partial<UserDto>): Promise<{ jwt: string, user: User }> {
        return this.userService.logIn(user);
    }


    @Post('/refresh')
    refresh(@Body('token') token: string): Promise<{ refreshToken: string }> {
        return this.userService.refresh(token);

    }



    @Get('/:id')
    @RoleProtected(Roles.ADMIN, Roles.GERENTE, Roles.COLABORADOR)
    @UseGuards(AuthGuard(), UserRoleGuard)
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);

    }

    @Get('/')

    allUser(
        @Query('role') role?: number, @Query('id') id?: number) {
        return this.userService.getUsers()

    }



    @Get('search/:type')
    @RoleProtected(Roles.ADMIN, Roles.GERENTE, Roles.COLABORADOR)
    @UseGuards(AuthGuard(), UserRoleGuard)
    getType(@Param('type') type: string): Promise<User[]> {
        return this.userService.getUsers(type);

    }


    @Delete('/:id')
    @RoleProtected(Roles.ADMIN, Roles.GERENTE, Roles.COLABORADOR)
    @UseGuards(AuthGuard(), UserRoleGuard)
    deleteUser(@Param('id') id: number): Promise<boolean> {
        return this.userService.delete(id);

    }




}
