import { EntityBase } from "src/tools/entityBase";
import { Column, Entity } from "typeorm";

@Entity()
export class Afiliado extends EntityBase {

    @Column({ nullable: true })
    fechaEmision: Date;
    @Column({ nullable: true })
    fechaFacturacion: Date;
    @Column({ nullable: true })
    fechaPagoDelegacion: Date;
    @Column({ nullable: true })
    registro: string;
    @Column({ nullable: true })
    certificado: number;
    @Column({ nullable: true })
    nip: number;
    @Column({ nullable: true })
    inicioOperaciones: Date;
    @Column({ nullable: true })
    nombre: string;
    @Column({ nullable: true })
    cumpleanos: Date;
    @Column({ nullable: true })
    representanteLegal: string;
    @Column({ nullable: true })
    tamano: string;
    @Column({ nullable: true })
    telefono1: string;
    @Column({ nullable: true })
    telefono2: string;
    @Column({ nullable: true })
    correo1: string;
    @Column({ nullable: true })
    correo2: string;
    @Column({ nullable: true })
    anosConsecutivos: number;
    @Column({ nullable: true })
    ultimoAno: number;
    @Column({ nullable: true })
    especialidad1: string;
    @Column({ nullable: true })
    especialidad2: string;
    @Column({ nullable: true })
    especialidad3: string;



}
