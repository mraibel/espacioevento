import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcione } from './entities/inscripcione.entity';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcione)
    private readonly inscripcionRepository: Repository<Inscripcione>,
  ) {}

  async findAll(): Promise<Inscripcione[]> {
    return await this.inscripcionRepository.find({
      relations: ['usuario', 'evento'],
      order: { fecha_inscripcion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Inscripcione> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id_inscripcion: id },
      relations: ['usuario', 'evento'],
    });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  async create(dto: CreateInscripcioneDto): Promise<Inscripcione> {
    // Si no se proporciona fecha de inscripción, usar la fecha actual
    if (!dto.fecha_inscripcion) {
      dto.fecha_inscripcion = new Date().toISOString().split('T')[0];
    }

    const nuevaInscripcion = this.inscripcionRepository.create(dto);
    return await this.inscripcionRepository.save(nuevaInscripcion);
  }

  async update(id: number, dto: UpdateInscripcioneDto): Promise<Inscripcione> {
    const inscripcion = await this.findOne(id);
    const inscripcionActualizada = this.inscripcionRepository.merge(
      inscripcion,
      dto,
    );
    return await this.inscripcionRepository.save(inscripcionActualizada);
  }

  async remove(id: number): Promise<void> {
    const inscripcion = await this.findOne(id);
    await this.inscripcionRepository.remove(inscripcion);
  }
}
