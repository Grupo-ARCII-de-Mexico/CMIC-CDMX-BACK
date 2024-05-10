import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Delegacion extends EntityBase{

    @Column()
    ciudad:string;
    @Column()
    region:number;

}
