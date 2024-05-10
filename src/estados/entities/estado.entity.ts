import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Estado extends EntityBase{
    @Column()
    nombre:string;
}
