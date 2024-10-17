import { IsNotEmpty } from "class-validator"

export class CreateDirectorioDto {
    @IsNotEmpty()
    nombre:string

    @IsNotEmpty()
    correo:string

    @IsNotEmpty()
    cargo:string

    @IsNotEmpty()
    departamento:number

}
