import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBolsaTrabajoDto {
    @IsOptional()
    foto:string;
    @IsNotEmpty()
    descripcion:string;
    @IsNotEmpty()
    espacio:string;
    @IsNotEmpty()
    tipoContratacion:string;
    @IsNotEmpty()
    vigencia:Date;
    @IsNotEmpty()
    estado:string;
    @IsNotEmpty()
    municipio:string;
    @IsOptional()
    delegacion:string;
    @IsOptional()
    mostrarSalario:boolean;
    @IsNotEmpty()
    puestoDeseado:string;
    @IsNotEmpty()
    escolaridad:string;
    @IsNotEmpty()
    edad:string;
    @IsNotEmpty()
    estadoCivil:string;
    @IsNotEmpty()
    salario:string;
    @IsNotEmpty()
    tareas:string;
    @IsNotEmpty()
    prestaciones:string;
    @IsNotEmpty()
    titulo:string;
    @IsOptional()
    active:boolean
    @IsOptional()
    idAfiliado:number;

}
