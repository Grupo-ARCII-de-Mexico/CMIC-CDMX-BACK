import { IsOptional } from "class-validator";

export class CreateComentarioDto {
    @IsOptional()
    puntuacion:number
    @IsOptional()
    persona:string;
    @IsOptional()
    empresa:string;
    @IsOptional()
    imagen:string;
    @IsOptional()
    texto:string;

}
