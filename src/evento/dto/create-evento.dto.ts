import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventoDto {
    @IsNotEmpty()
    fechaInicio:Date;
    @IsNotEmpty()
    fechaFin:Date;
    @IsNotEmpty()
    titulo:string;
    @IsNotEmpty()
    detalles:string;
    @IsOptional()
    pasarelasPago:number[];
    @IsOptional()
    publicos:number[];
    @IsOptional()
    costos:any;
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    esGratis:boolean;
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    esPresencial:boolean;
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    tieneCupoMaximo:boolean;
    @IsOptional()
    cupo:number;
    @IsOptional()
    imagen:string;
    @IsOptional()
    zoom:string
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    hayPrensa:boolean
    @IsOptional()
      zoomPassword:string
      @IsOptional()
      mapLat:number
      @IsOptional()
      mapLong:number
      @IsOptional()
      identificador:string
      @IsNotEmpty()
      tipoEvento:number;
      @IsOptional()
      lugar:string
      @IsOptional()
      active:boolean;
      @IsOptional()
      agenda:any;
      @IsOptional()
      ponentes:any;
      @IsOptional()
      modal:any;
}
