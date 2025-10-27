import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Sala } from '../../salas/entities/sala.entity';

export enum TipoEvento {
  PUBLICO = 'público',
  PRIVADO = 'privado',
}


export enum EstadoEvento {
  ACTIVO = 'activo',
  FINALIZADO = 'finalizado',
  CANCELADO = 'cancelado',
}

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id_evento: number;

  @Column({ type: 'int' })
  id_organizador: number;

  @Column({ type: 'int' })
  id_sala: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_organizador' })
  organizador: Usuario;

  @ManyToOne(() => Sala)
  @JoinColumn({ name: 'id_sala' })
  sala: Sala;

  @Column({ type: 'varchar', length: 255 })
  nombre_evento: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'varchar', length: 10 })
  hora_inicio: string;

  @Column({ type: 'varchar', length: 10 })
  hora_fin: string;

  @Column({ type: 'int' })
  cupos_totales: number;

  @Column({ type: 'decimal', default: 0 })
  precio_entrada: number;

  @Column({ type: 'enum', enum: TipoEvento})
  tipo_evento: TipoEvento;

  @Column({ type: 'enum', enum: EstadoEvento, default: EstadoEvento.ACTIVO })
  estado: EstadoEvento;
}
