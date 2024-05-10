import { IsOptional, IsPositive, Min } from "class-validator";


export class Pagination{
    @IsOptional()
    @IsPositive()
    @Min(0)
    offset:number;
    @IsPositive()
    @IsOptional()
    limit:number;
}