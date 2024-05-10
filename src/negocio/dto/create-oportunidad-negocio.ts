import { IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateOportunidadNegocioDto {
    @IsOptional()
    web:string;
    @IsNotEmpty()
    empresa:string;
    @IsOptional()
    documentos:any[];
    @IsNotEmpty()
    afiliado:string;
    @IsNotEmpty()
    denominacion:string;
    @IsNotEmpty()
    rfc:string;
    @IsNotEmpty()
    estado:string;
    @IsNotEmpty()
    municipio:string;
    @IsNotEmpty()
    calle:string;
    @IsNotEmpty()
    colonia:string;
    @IsNotEmpty()
    cp:number;
    @IsNotEmpty()
    negocio:number
    @IsOptional()
    especialidades:any[];
    @IsNotEmpty()
    contacto:number;
    @IsOptional()
    folio:string


}



export class UpdateOportunidadNegocioDto extends PartialType(CreateOportunidadNegocioDto) {}
