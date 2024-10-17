import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Slider extends EntityBase{
    @Column()
    texto:string
    @Column()
    imagen:string
    @Column()
    uri:string
    @Column()
    button:string
    @Column({default:0})
    position:number
    @Column({default:true})
    blur:boolean
}
