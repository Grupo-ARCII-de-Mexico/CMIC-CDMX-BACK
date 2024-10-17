import { IsOptional } from "class-validator";

export class CreateAfiliadoDto {
    @IsOptional()
    fechaEmision: Date;
    @IsOptional()
    fechaFacturacion: Date;
    @IsOptional()
    fechaPagoDelegacion: Date;
    @IsOptional()
    registro: string;
    @IsOptional()
    certificado: number;
    @IsOptional()
    nip: number;
    @IsOptional()
    inicioOperaciones: Date;
    @IsOptional()
    nombre: string;
    @IsOptional()
    representanteLegal: string;
    @IsOptional()
    tamano: string;
    @IsOptional()
    telefono1: string;
    @IsOptional()
    telefono2: string;
    @IsOptional()
    correo1: string;
    @IsOptional()
    correo2: string;
    @IsOptional()
    anosConsecutivos: number;
    @IsOptional()
    ultimoAno: number;
    @IsOptional()
    especialidad1: string;
    @IsOptional()
    especialidad2: string;
    @IsOptional()
    especialidad3: string;
    @IsOptional()
    cumpleanos: Date;
}
