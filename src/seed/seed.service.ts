import { Injectable } from '@nestjs/common';
import { EventosService } from '../eventos/eventos.service';
import { TipoEvento, EstadoEvento } from '../eventos/entities/evento.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { SalasService } from '../salas/salas.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly eventosService: EventosService,
    private readonly usuariosService: UsuariosService,
    private readonly salasService: SalasService,
  ) {}

  async executeSeed() {
    const usuario1 = await this.usuariosService.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@example.com',
      contraseña: '123456',
      rol: 'organizador'
    });
    const usuario2 = await this.usuariosService.create({
      nombre: 'Ana',
      apellido: 'García',
      correo: 'ana@example.com',
      contraseña: '123456',
      rol: 'organizador'
    });

    const sala1 = await this.salasService.create({
      nombre: 'Sala Principal',
      ubicación: 'Edificio A',
      capacidad: 100,
      precio_arriendo: 1500,
      estado: 'disponible'
    });
    const sala2 = await this.salasService.create({
      nombre: 'Sala VIP',
      ubicación: 'Edificio B',
      capacidad: 50,
      precio_arriendo: 3000,
      estado: 'disponible'
    });

  
    const eventos = [
      {
        id_organizador: usuario1.id_usuario,
        id_sala: sala1.id_sala,
        nombre_evento: 'Concierto de Rock',
        descripcion: 'Un gran concierto de rock con bandas locales.',
        fecha: '2025-10-15',
        hora_inicio: '20:00',
        hora_fin: '23:00',
        cupos_totales: 100,
        precio_entrada: 500,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario2.id_usuario,
        id_sala: sala2.id_sala,
        nombre_evento: 'Fiesta de Halloween',
        descripcion: 'Fiesta temática de Halloween para todas las edades.',
        fecha: '2025-10-31',
        hora_inicio: '22:00',
        hora_fin: '03:00',
        cupos_totales: 50,
        precio_entrada: 0,
        tipo_evento: TipoEvento.PRIVADO,
        estado: EstadoEvento.ACTIVO
      }
    ];

    for (const evento of eventos) {
      await this.eventosService.create(evento);
    }

    return {
      message: 'Seed executed successfully',
      usuarios: [usuario1, usuario2],
      salas: [sala1, sala2],
      eventos: eventos.length,
    }
  }
}
