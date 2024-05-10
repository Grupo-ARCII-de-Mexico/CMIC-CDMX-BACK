import { IsNotEmpty } from "class-validator";

export class CreateDelegacionDto {
    @IsNotEmpty()
    ciudad:string;
    @IsNotEmpty()
    region:number;
}
