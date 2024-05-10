import { Exclude } from "class-transformer";
import { Boleto } from "src/boleto/entities/boleto.entity";
import { EntityBase } from "src/tools/entityBase";
import { TipoEvento } from "src/tools/enums/tipoEvento.enum";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Evento extends EntityBase {
    @Column()
    fechaInicio:Date;
    @Column({default:'sin-imagen.jpg'})
    imagen:string;
    @Column()
    fechaFin:Date;
    @Column()
    titulo:string;
    @Column({default:''})
    detalles:string;
    @Column({type:'simple-array',default:[]})
    pasarelasPago:number[];
    @Column({type:'simple-array',default:[0]})
    publicos:number[];
    @Column({type:'jsonb',nullable:true})
    costos:any;
    @Column({default:false})
    esGratis:boolean;
    @Column({default:false})
    tieneCupoMaximo:boolean;
    @Column({default:false})
    hayPrensa:boolean;
    @Column({default:0})
    cupo:number;
    @Column({nullable:true})
    zoom:string
    @Column({nullable:true})
    @Exclude()
    zoomPassword:string
    @Column({type:'double precision',nullable:true})
    mapLat:number
    @Column({type:'double precision',nullable:true})
    mapLong:number
    @Column({default:TipoEvento.PRESENCIAL })
    tipoEvento:number;
    @Column({default:''})
    identificador:string
    @Column({default:null,type:'jsonb'})
    ponentes:any;
    @Column({default:null,type:'jsonb'})
    agenda:any;
    @Column({default:''})
    lugar:string
    @Column({type:'jsonb',nullable:true})
    modal:any
    @OneToMany(
        () => Boleto,
        bol => bol.evento,
        {onDelete:'CASCADE'}
    )
    boletos:Boleto[]
}
