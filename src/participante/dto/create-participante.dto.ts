import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateParticipanteDto {
    @IsNotEmpty()
    nombre:string;
    @IsNotEmpty()
    telefono:string;
    @IsNotEmpty()
    email:string;
    @IsOptional()
    tipo:string;
    @IsOptional()
    rfc:string;
    @IsOptional()
    curp:string;
    @IsOptional()
    cargo:string;
    @IsOptional()
    delegacion:string;
    @IsOptional()
    organizacion:string;
    @IsOptional()
    empresa:string;
    @IsOptional()
    numAfiliado:string;
    @IsOptional()
    evidencia:string;
    @IsOptional()
    estado:number
   
}
