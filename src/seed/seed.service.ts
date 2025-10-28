import { Injectable } from '@nestjs/common';
import { EventosService } from '../eventos/eventos.service';
import { TipoEvento, EstadoEvento } from '../eventos/entities/evento.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { SalasService } from '../salas/salas.service';
import { RolUsuario } from 'src/usuarios/entities/usuario.entity';
import { EstadoPago, MetodoPago, TipoPago } from 'src/pagos/entities/pago.entity';
import { PagosService } from 'src/pagos/pagos.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly eventosService: EventosService,
    private readonly usuariosService: UsuariosService,
    private readonly salasService: SalasService,
    private readonly pagosService: PagosService
  ) {}

  async executeSeed() {
    // Crear usuarios organizadores
    const usuario1 = await this.usuariosService.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@example.com',
      contraseña: '123456',
      rol: RolUsuario.ORGANIZADOR
    });
    const usuario2 = await this.usuariosService.create({
      nombre: 'Ana',
      apellido: 'García',
      correo: 'ana@example.com',
      contraseña: '123456',
      rol: RolUsuario.ORGANIZADOR
    });
    const usuario3 = await this.usuariosService.create({
      nombre: 'Carlos',
      apellido: 'López',
      correo: 'carlos@example.com',
      contraseña: '123456',
      rol: RolUsuario.ORGANIZADOR
    });

    // Crear usuarios asistentes
    const asistente1 = await this.usuariosService.create({
      nombre: 'María',
      apellido: 'Rodríguez',
      correo: 'maria@example.com',
      contraseña: '123456',
      rol: RolUsuario.ASISTENTE
    });
    const asistente2 = await this.usuariosService.create({
      nombre: 'Pedro',
      apellido: 'Martínez',
      correo: 'pedro@example.com',
      contraseña: '123456',
      rol: RolUsuario.ASISTENTE
    });
    const asistente3 = await this.usuariosService.create({
      nombre: 'Laura',
      apellido: 'Sánchez',
      correo: 'laura@example.com',
      contraseña: '123456',
      rol: RolUsuario.ASISTENTE
    });

    // Crear salas
    const sala1 = await this.salasService.create({
      nombre: 'Sala Principal',
      ubicación: 'Edificio A - Piso 1',
      capacidad: 150,
      precio_arriendo: 2000,
      estado: 'disponible'
    });
    const sala2 = await this.salasService.create({
      nombre: 'Sala VIP',
      ubicación: 'Edificio B - Piso 3',
      capacidad: 50,
      precio_arriendo: 3500,
      estado: 'disponible'
    });
    const sala3 = await this.salasService.create({
      nombre: 'Auditorio Central',
      ubicación: 'Edificio C - Planta Baja',
      capacidad: 300,
      precio_arriendo: 5000,
      estado: 'disponible'
    });
    const sala4 = await this.salasService.create({
      nombre: 'Salón de Conferencias',
      ubicación: 'Edificio A - Piso 2',
      capacidad: 80,
      precio_arriendo: 1500,
      estado: 'disponible'
    });
    const sala5 = await this.salasService.create({
      nombre: 'Terraza Jardín',
      ubicación: 'Edificio D - Azotea',
      capacidad: 120,
      precio_arriendo: 2500,
      estado: 'arrendada'
    });

    // Crear eventos
    const eventos = [
      {
        id_organizador: usuario1.id_usuario,
        id_sala: sala1.id_sala,
        nombre_evento: 'Concierto de Rock',
        descripcion: 'Un gran concierto de rock con bandas locales reconocidas.',
        fecha: '2025-03-15',
        hora_inicio: '20:00',
        hora_fin: '23:30',
        cupos_totales: 150,
        precio_entrada: 25000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario2.id_usuario,
        id_sala: sala2.id_sala,
        nombre_evento: 'Cena de Gala Empresarial',
        descripcion: 'Evento privado de networking empresarial.',
        fecha: '2025-03-20',
        hora_inicio: '19:00',
        hora_fin: '23:00',
        cupos_totales: 50,
        precio_entrada: 80000,
        tipo_evento: TipoEvento.PRIVADO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario1.id_usuario,
        id_sala: sala3.id_sala,
        nombre_evento: 'Festival de Música Electrónica',
        descripcion: 'Festival con los mejores DJ internacionales.',
        fecha: '2025-04-10',
        hora_inicio: '22:00',
        hora_fin: '06:00',
        cupos_totales: 300,
        precio_entrada: 35000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario3.id_usuario,
        id_sala: sala4.id_sala,
        nombre_evento: 'Conferencia de Tecnología',
        descripcion: 'Charlas y talleres sobre las últimas tendencias en tecnología.',
        fecha: '2025-03-25',
        hora_inicio: '09:00',
        hora_fin: '18:00',
        cupos_totales: 80,
        precio_entrada: 15000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario2.id_usuario,
        id_sala: sala5.id_sala,
        nombre_evento: 'Boda en Jardín',
        descripcion: 'Ceremonia y celebración de boda al aire libre.',
        fecha: '2025-04-05',
        hora_inicio: '16:00',
        hora_fin: '02:00',
        cupos_totales: 120,
        precio_entrada: 0,
        tipo_evento: TipoEvento.PRIVADO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario3.id_usuario,
        id_sala: sala1.id_sala,
        nombre_evento: 'Stand Up Comedy Night',
        descripcion: 'Una noche de risas con los mejores comediantes nacionales.',
        fecha: '2025-03-28',
        hora_inicio: '21:00',
        hora_fin: '23:30',
        cupos_totales: 150,
        precio_entrada: 18000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario1.id_usuario,
        id_sala: sala4.id_sala,
        nombre_evento: 'Taller de Fotografía',
        descripcion: 'Aprende técnicas profesionales de fotografía.',
        fecha: '2025-04-15',
        hora_inicio: '10:00',
        hora_fin: '14:00',
        cupos_totales: 30,
        precio_entrada: 12000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.ACTIVO
      },
      {
        id_organizador: usuario2.id_usuario,
        id_sala: sala3.id_sala,
        nombre_evento: 'Festival de Cine Independiente',
        descripcion: 'Proyección de cortometrajes y largometrajes independientes.',
        fecha: '2025-02-20',
        hora_inicio: '15:00',
        hora_fin: '22:00',
        cupos_totales: 250,
        precio_entrada: 10000,
        tipo_evento: TipoEvento.PUBLICO,
        estado: EstadoEvento.FINALIZADO
      }
    ];

    for (const evento of eventos) {
      await this.eventosService.create(evento);
    }

    // Pago de entrada a evento (Concierto de Rock - evento 1)
    const pago1 = await this.pagosService.create({
    id_usuario: asistente1.id_usuario,
    id_evento: 1, // Primer evento creado
    monto: 25000,
    tipo_pago: TipoPago.ENTRADA,
    metodo: MetodoPago.TARJETA,
    fecha_pago: '2025-10-27',
    estado: EstadoPago.CONFIRMADO
    });

    // Pago de arriendo de sala (Sala Principal)
    const pago2 = await this.pagosService.create({
    id_usuario: usuario1.id_usuario,
    id_sala: sala1.id_sala,
    monto: 2000,
    tipo_pago: TipoPago.ARRIENDO,
    metodo: MetodoPago.TRANSFERENCIA,
    fecha_pago: '2025-10-27',
    estado: EstadoPago.CONFIRMADO
    });

    return {
      message: 'Seed executed successfully',
      usuarios: {
        organizadores: [usuario1, usuario2, usuario3],
        asistentes: [asistente1, asistente2, asistente3]
      },
      salas: [sala1, sala2, sala3, sala4, sala5],
      eventos: eventos.length,
    }
  }
}
