import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import { Sala } from '../../salas/entities/sala.entity';

export enum TipoPago {
  ARRIENDO = 'arriendo',
  ENTRADA = 'entrada',
}

export enum MetodoPago {
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia',
  EFECTIVO = 'efectivo',
}

export enum EstadoPago {
  PENDIENTE = 'pendiente',
  CONFIRMADO = 'confirmado',
  RECHAZADO = 'rechazado',
}

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'int' })
  id_usuario: number;

  @Column({ type: 'int', nullable: true })
  id_evento: number;

  @Column({ type: 'int', nullable: true })
  id_sala: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'id_evento' })
  evento: Evento;

  @ManyToOne(() => Sala)
  @JoinColumn({ name: 'id_sala' })
  sala: Sala;

  @Column({ type: 'decimal' })
  monto: number;

  @Column({ type: 'enum', enum: TipoPago })
  tipo_pago: TipoPago;

  @Column({ type: 'enum', enum: MetodoPago })
  metodo: MetodoPago;

  @Column({ type: 'date' })
  fecha_pago: string;

  @Column({ type: 'enum', enum: EstadoPago, default: EstadoPago.PENDIENTE })
  estado: EstadoPago;
}
