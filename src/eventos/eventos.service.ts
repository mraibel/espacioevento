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
  ) {
    
  }

  async findAll(): Promise<Evento[]> {
    return await this.eventoRepository.find();
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

  async inscribir(id: number): Promise<Evento> {
    const evento = await this.findOne(id);
    
    if (evento.inscritos >= evento.cupos) {
      throw new BadRequestException('No hay cupos disponibles');
    }
    
    evento.inscritos++;
    return await this.eventoRepository.save(evento);
  }
}
