import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateApoyosDnDto {
    @IsNotEmpty()
    nombre:string;
    @IsNotEmpty()
    telefono:string;
    @IsNotEmpty()
    email:string;
    @IsOptional()
    rfc:string;
    @IsOptional()
    delegacion:string;
    @IsOptional()
    curp:string;
    @IsOptional()
    cargo:string;
    @IsOptional()
    organizacion:string;
    @IsOptional()
    empresa:string;
    @IsOptional()
    numAfiliado:string;
    @IsOptional()
    tipo:string;
    @IsNotEmpty()
    desastre:number;
}
