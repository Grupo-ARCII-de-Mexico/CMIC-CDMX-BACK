
import { Evento } from "src/evento/entities/evento.entity";
import { Participante } from "src/participante/entities/participante.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, ManyToOne, OneToOne} from "typeorm";

@Entity()
export class Boleto extends EntityBase{
    @Column({nullable:true})
    folio:string;
    @Column({nullable:true})
    qr:string;
    @Column({nullable:true})
    bouncher:string;
    @Column({nullable:true})
    costo:number;
    @Column({nullable:true})
    privilegio:string;
    @ManyToOne( 
        () => Participante,
        {nullable:true}
    )
    participante:Participante;
    @Column({nullable:true})
    idPago:string;
    @Column({nullable:true})
    plataformaPago:number
    @ManyToOne(
        () => Evento,
        eve => eve.boletos,
        {onDelete:'CASCADE'}
    )
    evento:Evento;
    @Column({default:false})
    quieroFactura:boolean
    @Column({default:false})
    checked:boolean

}
