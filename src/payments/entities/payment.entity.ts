import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Payment extends EntityBase {

    @Column()
    platform:number
    @Column()
    idPayment:string
    @Column({default:false})
    refound:boolean
    @Column()
    amount:number
}
