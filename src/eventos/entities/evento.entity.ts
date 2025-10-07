import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsDateString, IsNumber, Min, IsOptional } from 'class-validator';

@Entity('eventos')
export class Evento {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'varchar', length: 10 })
  hora: string;

  @Column({ type: 'int' })
  cupos: number;

  @Column({ type: 'int', default: 0 })
  inscritos: number;
}