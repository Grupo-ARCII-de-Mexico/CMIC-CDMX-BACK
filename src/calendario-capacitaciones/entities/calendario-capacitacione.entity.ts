import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class CalendarioCapacitacione extends EntityBase{

    @Column()
    texto:string;
    @Column()
    archivo:string;
    @Column()
    tipo:number;
}
