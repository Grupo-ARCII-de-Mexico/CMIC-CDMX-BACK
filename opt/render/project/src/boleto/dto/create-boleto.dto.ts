import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBoletoDto {
    @IsNotEmpty()
    evento:number
    @IsOptional()
    participante:number
    @IsOptional()
    costo:number
    @IsOptional()
    token:string;
    @IsOptional()
    privilegio:string;
    @IsNotEmpty()
    plataformaPago:number
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    quieroFactura:boolean
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    active:boolean;
    @IsOptional()
    bouncher:string
    @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true ? true : false)
    checked:boolean
}
