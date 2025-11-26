import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

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

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'text', array: true, default: ['asistente'] })
  roles: string[];

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_registro: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.correo = this.correo.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}

