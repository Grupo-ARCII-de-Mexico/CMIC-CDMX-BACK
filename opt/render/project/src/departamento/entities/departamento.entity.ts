import { Directorio } from "src/directorio/entities/directorio.entity";
import { EntityBase } from "src/tools/entityBase"
import { Column, Entity, OneToMany } from "typeorm"

@Entity()
export class Departamento extends EntityBase {
    @Column()
    nombre:string;
    @Column({default:0})
    posicion:number;
    @OneToMany(
        () => Directorio,
        d => d.departamento,
        {cascade:true}
    )
    directorios:Directorio[]
}
