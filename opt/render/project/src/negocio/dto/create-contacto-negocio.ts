import { IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateContactoNegocioDto {
    @IsNotEmpty()
    nombre:string;
    @IsNotEmpty()
    paterno:string;
    @IsOptional()
    materno:string;
    @IsNotEmpty()
    telefono:string;
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    oportunidad:number
    @IsOptional()
    telefonoOficina:string;

}



export class UpdateContactoNegocioDto extends PartialType(CreateContactoNegocioDto) {}
