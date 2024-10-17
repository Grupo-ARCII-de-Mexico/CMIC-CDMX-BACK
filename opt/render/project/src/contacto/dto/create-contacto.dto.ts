import { IsNotEmpty } from "class-validator";

export class CreateContactoDto {


    @IsNotEmpty()
    name:string
    
    @IsNotEmpty()
    correo:string
    
    @IsNotEmpty()
    tel:string
    
    @IsNotEmpty()
    mensaje:string


}
