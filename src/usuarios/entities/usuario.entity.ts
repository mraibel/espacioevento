import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    correo: string;

    @Column()
    password: string;

    @Column({ enum: ['admin', 'organizador', 'asistente'] })
    rol: string;

}
