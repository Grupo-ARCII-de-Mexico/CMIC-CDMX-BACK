/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class PlatformPaymentDto {

    @IsNotEmpty()
    names:string;
    @IsOptional()
    phone:string;

    @IsOptional()
    password:string

    @IsOptional()
    role:string
    
}

export class updateUserDto extends PartialType(PlatformPaymentDto){}