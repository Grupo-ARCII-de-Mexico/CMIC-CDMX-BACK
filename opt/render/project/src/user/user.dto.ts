/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    names:string;
    @IsOptional()
    phone:string;
    @IsOptional()
    foto:string;
    @IsOptional()
    user:string;
    @IsOptional()
    gravatar:boolean
    @IsNotEmpty()
    email:string;

    @IsOptional()
    password:string

    @IsOptional()
    role:string
    
}

export class updateUserDto extends PartialType(UserDto){}