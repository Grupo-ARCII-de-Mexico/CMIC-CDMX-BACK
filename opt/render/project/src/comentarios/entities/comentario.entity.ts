import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Comentario extends EntityBase{
    @Column({nullable:true})
    puntuacion:number
    @Column({nullable:true})
    persona:string;
    @Column({nullable:true})
    empresa:string;
    @Column({nullable:true})
    imagen:string;
    @Column({nullable:true})
    texto:string;


}
