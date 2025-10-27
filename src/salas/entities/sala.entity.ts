import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Sala {
    @PrimaryGeneratedColumn()
    id_sala: number;

    @Column()
    nombre: string;

    @Column()
    ubicación: string;

    @Column()
    capacidad: number;

    @Column("decimal")
    precio_arriendo: number;

    @Column()
    estado: 'disponible' | 'arrendada' | 'inactiva';
}
