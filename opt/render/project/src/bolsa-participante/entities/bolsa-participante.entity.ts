import { BolsaTrabajo } from "src/bolsa-trabajo/entities/bolsa-trabajo.entity"
import { EntityBase } from "src/tools/entityBase"
import { Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class BolsaParticipante extends EntityBase {
    @Column()
    nombre:string
    @Column()
    correo:string
    @Column()
    telefono:string
    @Column()
    curriculum:string
    @Column({nullable:true})
    experiencia:string
    @Column({nullable:true})
    sueldo:string
    @Column({nullable:true})
    competencias:string
    @Column({nullable:true})
    alcaldia:string
    @Column({nullable:true})
    matricula:string
    @Column({nullable:true})
    area:string
    @Column({nullable:true,type:'simple-array'})
    idiomas:string[]
    @ManyToOne(
        () => BolsaTrabajo,
        bt => bt.postulantes,
        {nullable:true}
    )
    trabajo:BolsaTrabajo
}