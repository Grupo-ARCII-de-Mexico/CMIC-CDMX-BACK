import { BolsaParticipante } from "src/bolsa-participante/entities/bolsa-participante.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class BolsaTrabajo extends EntityBase {

    @Column({default:'sin-imagen.jpg'})
    foto:string;
    @Column()
    descripcion:string;
    @Column()
    titulo:string;
    @Column()
    identificador:string;
    @OneToMany(
        () => BolsaParticipante,
        bp => bp.trabajo
    )
    postulantes:BolsaParticipante[]

    @Column({nullable:true})
    espacio:string;
    @Column({nullable:true})
    tipoContratacion:string;
    @Column({nullable:true})
    vigencia:Date;
    @Column({nullable:true})
    estado:string;
    @Column({nullable:true})
    municipio:string;
    @Column({nullable:true})
    delegacion:string;
    @Column({default:false})
    mostrarSalario:boolean;
    @Column({nullable:true})
    puestoDeseado:string;
    @Column({nullable:true})
    escolaridad:string;
    @Column({nullable:true})
    edad:string;
    @Column({nullable:true})
    estadoCivil:string;
    @Column({nullable:true})
    salario:string;
    @Column({nullable:true})
    tareas:string;
    @Column({nullable:true})
    prestaciones:string;
    @Column({nullable:true})
    idAfiliado:number;
}
