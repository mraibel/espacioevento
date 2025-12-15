import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salasRepository: Repository<Sala>,
  ) {}

  create(createSalaDto: CreateSalaDto) {
    const sala = this.salasRepository.create(createSalaDto);
    return this.salasRepository.save(sala);
  }

  findAll() {
    return this.salasRepository.find();
  }

  findOne(id: number) {
    return this.salasRepository.findOne({ where: { id_sala: id } });
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return this.salasRepository.update({ id_sala: id }, updateSalaDto);
  }

  async remove(id: number) {
    try {
      const result = await this.salasRepository.delete({ id_sala: id });
      if (result.affected === 0) {
        throw new BadRequestException('Sala no encontrada');
      }
      return result;
    } catch (error) {
      if (error.code === '23503') {
        // Foreign key violation
        throw new BadRequestException(
          'No se puede eliminar la sala porque está siendo usada por eventos',
        );
      }
      throw error;
    }
  }
}
