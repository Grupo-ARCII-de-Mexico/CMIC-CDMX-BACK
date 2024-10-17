import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateSliderDto {
    @IsNotEmpty()
    texto:string
    @IsOptional()
    imagen:string
    @IsNotEmpty()
    uri:string
    @IsNotEmpty()
    button:string
    @IsOptional()
    blur:boolean
    @IsOptional()
    position:number
}
