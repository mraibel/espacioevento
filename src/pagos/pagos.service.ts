import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago, TipoPago } from './entities/pago.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    // Validar que exista id_evento o id_sala según el tipo de pago
    if (createPagoDto.tipo_pago === TipoPago.ARRIENDO && !createPagoDto.id_sala) {
      throw new BadRequestException('Para pagos de arriendo se requiere id_sala');
    }
    
    if (createPagoDto.tipo_pago === TipoPago.ENTRADA && !createPagoDto.id_evento) {
      throw new BadRequestException('Para pagos de entrada se requiere id_evento');
    }

    const pago = this.pagoRepository.create(createPagoDto);
    return await this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find({
      relations: ['usuario', 'evento', 'sala'],
      order: { fecha_pago: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id_pago: id },
      relations: ['usuario', 'evento', 'sala'],
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pago;
  }

  async findByUsuario(id_usuario: number): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { id_usuario },
      relations: ['evento', 'sala'],
      order: { fecha_pago: 'DESC' },
    });
  }

  async findByEvento(id_evento: number): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { id_evento },
      relations: ['usuario'],
      order: { fecha_pago: 'DESC' },
    });
  }

  async findBySala(id_sala: number): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { id_sala },
      relations: ['usuario'],
      order: { fecha_pago: 'DESC' },
    });
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);

    if (updatePagoDto.tipo_pago) {
      if (updatePagoDto.tipo_pago === TipoPago.ARRIENDO && !updatePagoDto.id_sala && !pago.id_sala) {
        throw new BadRequestException('Para pagos de arriendo se requiere id_sala');
      }
      
      if (updatePagoDto.tipo_pago === TipoPago.ENTRADA && !updatePagoDto.id_evento && !pago.id_evento) {
        throw new BadRequestException('Para pagos de entrada se requiere id_evento');
      }
    }

    Object.assign(pago, updatePagoDto);
    return await this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<void> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
  }
}