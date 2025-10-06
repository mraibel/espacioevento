import { Injectable, NotFoundException } from '@nestjs/common';
import { Evento } from './interfaces/evento.interface';
import { CrearEventoDto } from './dto/crear-evento.dto';

@Injectable()
export class EventosService {
  private eventos: Evento[] = [
    { id: 1, nombre: 'Conferencia IA', fecha: '2025-10-10', hora: '18:00', cupos: 100, inscritos: 0 },
    { id: 2, nombre: 'Taller NestJS', fecha: '2025-11-05', hora: '15:00', cupos: 50, inscritos: 0 },
  ];

  findAll(): Evento[] {
    return this.eventos;
  }

  findOne(id: number): Evento {
    const evento = this.eventos.find(e => e.id === id);
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  create(dto: CrearEventoDto): Evento {
    const nuevo: Evento = {
      id: this.eventos.length ? Math.max(...this.eventos.map(e => e.id)) + 1 : 1,
      ...dto,
      inscritos: 0,
    };
    this.eventos.push(nuevo);
    return nuevo;
  }

  inscribir(id: number): Evento {
    const evento = this.findOne(id);
    if (evento.inscritos >= evento.cupos) {
      throw new Error('No hay cupos disponibles');
    }
    evento.inscritos++;
    return evento;
  }
}
