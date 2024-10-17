import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCalendarioCapacitacioneDto {

    @IsNotEmpty()
    texto:string;
    @IsOptional()
    archivo:string;
    @IsNotEmpty()
    tipo:number;

}
