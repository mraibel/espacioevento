import { Evento } from "src/eventos/entities/evento.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Inscripcione {

    @PrimaryGeneratedColumn()
    id_inscripcion: number;

    @Column({ type: 'int' })
    id_evento: number;

    @Column({ type: 'int' })
    id_usuario: number;

    @Column({ type: 'enum', enum: ['pendiente', 'pagado'], default: 'pendiente' })
    estado_pago: 'pendiente' | 'pagado';

    @Column({ type: 'boolean', default: false })
    asistencia: boolean;

    @Column({ type: 'date' })
    fecha_inscripcion: string;

    // Relaciones

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Evento)
    @JoinColumn({ name: 'id_evento' })
    evento: Evento;
    
}
