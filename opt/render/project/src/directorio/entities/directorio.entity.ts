import { Departamento } from "src/departamento/entities/departamento.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Directorio extends EntityBase {
    
    @Column()
    nombre:string

    @Column()
    correo:string

    @Column()
    cargo:string
    @ManyToOne(
        () => Departamento,
        d => d.directorios,
        { onDelete:'CASCADE' }
    )
    departamento:Departamento
}
