import { Boleto } from "src/boleto/entities/boleto.entity";
import { Estado } from "src/estados/entities/estado.entity";
import { EntityBase } from "src/tools/entityBase";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Participante extends EntityBase{
    @Column()
    nombre:string;
    @Column()
    telefono:string;
    @Column()
    email:string;
    @Column({nullable:true})
    rfc:string;
    @Column({nullable:true})
    delegacion:string;
    @Column({nullable:true})
    curp:string;
    @Column({nullable:true})
    cargo:string;
    @Column({nullable:true})
    organizacion:string;
    @Column({nullable:true})
    empresa:string;
    @Column({nullable:true})
    numAfiliado:string;
    @Column({default:0})
    tipo:string;
    @Column({default:''})
    evidencia:string;
    @ManyToOne(
        () => Estado,
        {nullable:true}
    )
    estado:Estado
    @OneToMany(
        () =>Boleto,
        boleto=>boleto.participante
    )
    boletos:Boleto[];
    
}
