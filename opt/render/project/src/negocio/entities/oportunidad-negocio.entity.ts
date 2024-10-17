import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Negocio } from "./negocio.entity";
import { ContactoNegocio } from "./contacto-negocio.entity";


@Entity()
export class OportunidadNegocio extends EntityBase{
  
    @Column({nullable:true})
    web:string;
    @Column({nullable:true})
    empresa:string;
    @Column({nullable:true})
    folio:string;
    @Column({type:'jsonb',default:[]})
    documentos:any[];
    @Column({nullable:true})
    afiliado:string;
    @Column({nullable:true})
    denominacion:string;
    @Column({nullable:true})
    rfc:string;
    @Column({nullable:true})
    estado:string;
    @Column({nullable:true})
    municipio:string;
    @Column({nullable:true})
    calle:string;
    @Column({nullable:true})
    colonia:string;
    @Column({nullable:true})
    cp:number;
    @ManyToOne(
        ()=> Negocio,
        n=>n.oportunidadNegocio,
        {onDelete:'CASCADE'}
    )
    negocio:Negocio
    @Column({type:'jsonb',default:[]})
    especialidades:any[];
    @OneToOne(
        () => ContactoNegocio,
        c => c.oportunidad,
        {onDelete:'CASCADE'}
    )
    @JoinColumn()
    contacto:ContactoNegocio;
}