import { Estado } from "src/estados/entities/estado.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, OneToOne } from "typeorm";
import { Negocio } from "./negocio.entity";
import { OportunidadNegocio } from "./oportunidad-negocio.entity";

@Entity()
export class ContactoNegocio extends EntityBase
{
    @Column()
    nombre:string;
    @Column()
    paterno:string;
    @Column({nullable:true})
    materno:string;
    @Column()
    telefono:string;
    @Column({nullable:true})
    telefonoOficina:string;
    @Column()
    email:string;
    @OneToOne(
        ()=>OportunidadNegocio,
        o => o.contacto,
        
    )
    oportunidad:OportunidadNegocio
    
}
