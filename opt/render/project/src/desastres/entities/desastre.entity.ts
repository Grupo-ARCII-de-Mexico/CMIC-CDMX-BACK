import { ApoyosDn } from "src/apoyos-dn/entities/apoyos-dn.entity";
import { EntityBase } from "src/tools/entityBase";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Desastre extends EntityBase{

    @Column()
    imagen:string;
    @Column()
    descripcion:string;
    @Column()
    titulo:string;
    @Column()
    identificador:string;
    @OneToMany(
        () => ApoyosDn,
        a => a.desastre,
        {onDelete:'CASCADE'}
    )
    apoyos:ApoyosDn[]



}
