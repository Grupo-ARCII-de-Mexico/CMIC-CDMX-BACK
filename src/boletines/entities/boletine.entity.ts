import { EntityBase } from "src/tools/entityBase";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity()
export class Boletin extends EntityBase{

    @Column({nullable:true})
    imagen:string;
    @Column()
    titulo:string;
    @Column()
    autor:string;
    @Column()
    informacion:string;
    @Column()
    identificador:string;
    @Column({default:new Date()})
    fecha:Date;
    @Column({type:'simple-array',nullable:true})
    imagenes:string[];
}
