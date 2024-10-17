import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateNegocioDto {
    @IsNotEmpty()
    logotipo:string;
    @IsNotEmpty()
    documentos:any[];
    @IsNotEmpty()
    especialidades:any[];
    @IsNotEmpty()
    identificador:string
    @IsNotEmpty()
    empresa:string;
    @IsOptional()
    convocatoria:string;
    @IsNotEmpty()
    documento:string;
    @IsOptional()
    usuario:string;
    @IsOptional()
    password:string;
}
