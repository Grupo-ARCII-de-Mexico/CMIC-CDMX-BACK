/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, EntityRepository, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Roles } from "src/tools/eventos.enum";
import { EntityBase } from "src/tools/entityBase";

@Entity()
export class User  extends EntityBase{
   
    @Column()
    names:string;
    @Column({nullable:true})
    lastname:string;

    @Column({nullable:true})
    phone:string;

    @Column({nullable:true})
    email:string
    @Column({nullable:true})
    user:string
    @Column({nullable:true})
    foto:string
    @Column({default:false})
    gravatar:boolean
    @Exclude()
    @Column()
    password:string
    @Exclude()
    @Column({default:Roles.USUARIO})
    role:number
 

 
}



