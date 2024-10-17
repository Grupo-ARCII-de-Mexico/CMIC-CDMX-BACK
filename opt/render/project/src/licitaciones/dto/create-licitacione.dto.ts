import { IsOptional } from "class-validator";

export class CreateLicitacioneDto {
    
    @IsOptional()
    procedimiento:string;
    @IsOptional()
    portal:string;
    @IsOptional()
    noProcedimiento:string;
    @IsOptional()
    unidadCompradora:string;
    @IsOptional()
    descripcionExpediente:string;
    @IsOptional()
    fechaPublicacion:Date
    @IsOptional()
    fechaLimiteBases:Date
    @IsOptional()
    fechaapertura:Date
    @IsOptional()
    fallo:Date
    @IsOptional()
    vigencia:string
    @IsOptional()
    link:string
}
