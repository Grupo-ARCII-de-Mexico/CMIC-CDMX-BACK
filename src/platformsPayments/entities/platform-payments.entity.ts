import { EntityBase } from "src/tools/entityBase";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class PlatformPayment extends EntityBase{

    @ManyToOne(
        () => User,
        {onDelete:'SET NULL'}
    )
    user:User;

    @Column()
    customerId:string;

    @Column()
    type:number
  

}
