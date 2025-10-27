import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CrearEventoDto } from './dto/crear-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventosService {

  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async findAll(): Promise<Evento[]> {
    return await this.eventoRepository.find({
      order: {
        fecha: 'ASC',
        hora: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async create(dto: CrearEventoDto): Promise<Evento> {
    const nuevoEvento = this.eventoRepository.create({
      ...dto,
      inscritos: 0,
    });
    return await this.eventoRepository.save(nuevoEvento);
  }

  async update(id: number, dto: CrearEventoDto): Promise<Evento> {
    const evento = await this.findOne(id);
    
    const eventoActualizado = this.eventoRepository.merge(evento, {
      ...dto,
      inscritos: evento.inscritos // Mantenemos el número de inscritos
    });
    
    return await this.eventoRepository.save(eventoActualizado);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
  }

  async inscribir(id: number): Promise<Evento> {
    const evento = await this.findOne(id);
    
    if (evento.inscritos >= evento.cupos) {
      throw new BadRequestException('No hay cupos disponibles');
    }
    
    evento.inscritos++;
    return await this.eventoRepository.save(evento);
  }

  async updatePartial(id: number, dto: Partial<CrearEventoDto>): Promise<Evento> {
    const evento = await this.findOne(id);
    // Si se intenta modificar los cupos, verificamos que no sea menor a los inscritos
    if (dto.cupos !== undefined && dto.cupos < evento.inscritos) {
      throw new BadRequestException('No se pueden reducir los cupos por debajo del número de inscritos');
    }
    const eventoActualizado = this.eventoRepository.merge(evento, dto);
    return await this.eventoRepository.save(eventoActualizado);
  }

}
