import { BeforeUpdate, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class EntityBase{

    @PrimaryGeneratedColumn()
    id:number;
    @Column({default:true})
    active:boolean;
    @UpdateDateColumn()
    updatedAt:Date
    @CreateDateColumn()
    createdAt:Date
    @BeforeUpdate()
    update(){
        this.updatedAt=new Date()
    }
}