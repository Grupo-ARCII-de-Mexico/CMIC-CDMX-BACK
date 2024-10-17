/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from 'src/tools/nodemailer.service';


@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'cmiC_%#@!sds!1313',
      signOptions: {
        expiresIn: '3h',
      },
    }),
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [UserService,JwtStrategy,EmailService],
  controllers: [UserController],
  exports:[JwtStrategy,PassportModule,UserService,TypeOrmModule]
})
export class UserModule {}
