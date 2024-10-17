import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Curso extends EntityBase {

    @Column()
    titulo:string
    @Column({nullable:true})
    informacion:string
    @Column({nullable:true})
    url:string
    
    @Column()
    imagen:string
    
    @Column()
    precio:string

    @Column({type:'jsonb',nullable:true})
    costos:any
    
    @Column()
    identificador:string

    @Column({nullable:true})
    tipo:string

}
