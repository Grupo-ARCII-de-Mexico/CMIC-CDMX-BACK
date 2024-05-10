import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDesastreDto {

    @IsOptional()
    imagen:string;
    @IsNotEmpty()
    descripcion:string;
    @IsNotEmpty()
    titulo:string;
    @IsNotEmpty()
    identificador:string;
    @IsOptional()
    active:boolean;

}
