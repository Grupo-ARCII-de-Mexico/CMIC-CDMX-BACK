import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Licitacione extends EntityBase {

    @Column({nullable:true})
    procedimiento:string;
    @Column({nullable:true})
    portal:string;
    @Column({nullable:true})
    noProcedimiento:string;
    @Column({nullable:true})
    unidadCompradora:string;
    @Column({nullable:true})
    descripcionExpediente:string;
    @Column({nullable:true})
    fechaPublicacion:Date
    @Column({nullable:true})
    fechaLimiteBases:Date
    @Column({nullable:true})
    fechaapertura:Date
    @Column({nullable:true})
    fallo:Date
    @Column({nullable:true})
    vigencia:string
    @Column({nullable:true})
    link:string



}
