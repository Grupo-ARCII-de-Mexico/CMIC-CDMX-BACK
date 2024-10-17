import { Desastre } from "src/desastres/entities/desastre.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ApoyosDn extends EntityBase{

    @Column()
    nombre:string;
    @Column()
    telefono:string;
    @Column()
    email:string;
    @Column({nullable:true})
    rfc:string;
    @Column({nullable:true})
    delegacion:string;
    @Column({nullable:true})
    cargo:string;
    @Column({nullable:true})
    empresa:string;
    @Column({nullable:true})
    numAfiliado:string;
    @ManyToOne(
        () => Desastre,
        a => a.apoyos,
        {onDelete:'CASCADE'}
    )
    desastre:Desastre;

}
