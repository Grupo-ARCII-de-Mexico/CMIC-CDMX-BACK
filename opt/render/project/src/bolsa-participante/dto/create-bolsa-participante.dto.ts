import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateBolsaParticipanteDto {
    @IsNotEmpty()
    nombre:string
    @IsNotEmpty()
    correo:string
    @IsNotEmpty()
    telefono:string
    @IsOptional()
    curriculum:string
    @IsNotEmpty()
    trabajo:number
    @IsOptional()
    experiencia:string
    @IsOptional()
    sueldo:string
    @IsOptional()
    competencias:string
    @IsOptional()
    alcaldia:string
    @IsOptional()
    matricula:string
    @IsOptional()
    idiomas:string[]
    @IsOptional()
    area:string
}
