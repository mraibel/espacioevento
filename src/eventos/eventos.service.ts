import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CrearEventoDto } from './dto/crear-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async findAll(): Promise<Evento[]> {
    return await this.eventoRepository.find({
      order: { fecha: 'ASC', hora_inicio: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id_evento: id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async create(dto: CrearEventoDto): Promise<Evento> {
    const nuevoEvento = this.eventoRepository.create(dto);
    return await this.eventoRepository.save(nuevoEvento);
  }

  async update(id: number, dto: CrearEventoDto): Promise<Evento> {
    const evento = await this.findOne(id);
    const eventoActualizado = this.eventoRepository.merge(evento, dto);
    return await this.eventoRepository.save(eventoActualizado);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
  }
}
