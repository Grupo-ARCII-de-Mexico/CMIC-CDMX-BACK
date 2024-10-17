import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class CreateComisioneDto {

    @IsOptional()
    imagen:string;
    @IsNotEmpty()
    texto:string;
    @IsNotEmpty()
    url:string;

}
