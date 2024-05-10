import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Comision extends EntityBase {

    @Column()
    imagen:string;
    @Column()
    texto:string;
    @Column()
    url:string;
}
