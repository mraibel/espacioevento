import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RolUsuario {
  ADMINISTRADOR = 'administrador',
  ORGANIZADOR = 'organizador',
  ASISTENTE = 'asistente',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  contraseña: string;

  @Column({ type: 'enum', enum: RolUsuario })
  rol: RolUsuario;

  @Column({ type: 'date' , default: () => 'CURRENT_DATE' })
  fecha_registro: string;
}

