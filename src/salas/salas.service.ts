import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalasService {

  constructor(
    @InjectRepository(Sala)
    private readonly salasRepository: Repository<Sala>
  ){}

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

  remove(id: number) {
    return this.salasRepository.delete({ id_sala: id });
  }
}
