import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { EventosService } from '../eventos/eventos.service';

@Injectable()
export class SeedService {

  constructor(private readonly eventosService: EventosService) {}

  async executeSeed() {
    const eventos = [
      {
        nombre: 'Concierto de Rock',
        fecha: '2025-10-15',
        hora: '20:00',
        cupos: 100,
        inscritos: 0
      },
      {
        nombre: 'Fiesta de Halloween',
        fecha: '2025-10-31',
        hora: '10:00',
        cupos: 200,
        inscritos: 0
      }
    ];

    for (const evento of eventos) {
      await this.eventosService.create(evento);
    }

    return {
      message: 'Seed executed successfully',
      count: eventos.length,
    }
  }
}
