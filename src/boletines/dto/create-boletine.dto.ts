import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBoletineDto {
    @IsOptional()
    imagen:string;
    @IsNotEmpty()
    titulo:string;
    @IsNotEmpty()
    autor:string;
    @IsNotEmpty()
    informacion:string;
    @IsNotEmpty()
    identificador:string;
    @IsOptional()
    @Type(() => Date)
    createdAt:Date
    @IsOptional()
    fecha:Date 
    @IsOptional()
    imagenes:string[];
}
