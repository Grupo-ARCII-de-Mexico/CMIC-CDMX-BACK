import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OportunidadNegocio } from "./oportunidad-negocio.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Negocio extends EntityBase{

    @Column({nullable:true})
    empresa:string;
    @Exclude()
    @Column({nullable:true})
    password:string;
    @Column({nullable:true})
    convocatoria:string;
    @Column({nullable:true})
    documento:string;
    @Column({nullable:true})
    logotipo:string;
    @Column({type:'jsonb',nullable:true})
    documentos:any[];
    @Column({type:'jsonb',default:[]})
    especialidades:any[];
    @Column({default:''})
    identificador:string
    @OneToMany(
        ()=>OportunidadNegocio,
        on=>on.negocio
    )
    oportunidadNegocio:OportunidadNegocio[]

}
