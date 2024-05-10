import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateCursoDto {
    @IsNotEmpty()
    titulo:string
    @IsOptional()
    informacion:string
    
    @IsOptional()
    imagen:string

    @IsOptional()
    costos:string

    @IsOptional()
    url:string
    
    @IsNotEmpty()
    precio:string
    
    @IsNotEmpty()
    identificador:string

    @IsNotEmpty()
    tipo:string

}
