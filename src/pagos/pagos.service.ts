import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago, TipoPago } from './entities/pago.entity';
import { Inscripcione } from '../inscripciones/entities/inscripcione.entity';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PagosService {
  private client: MercadoPagoConfig;

  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Inscripcione)
    private readonly inscripcionRepository: Repository<Inscripcione>,
  ) {
    // Access Token de prueba de Mercado Pago
    const accessToken =
      process.env.MERCADOPAGO_ACCESS_TOKEN ||
      'TEST-6202514999315089-121421-188b2c19cc69d01d973e6ad0dabfe947-675979706';
    console.log(
      'Inicializando Mercado Pago con token:',
      accessToken.substring(0, 20) + '...',
    );

    this.client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: { timeout: 5000 },
    });
  }

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    // Validar que exista id_evento o id_sala según el tipo de pago
    if (
      createPagoDto.tipo_pago === TipoPago.ARRIENDO &&
      !createPagoDto.id_sala
    ) {
      throw new BadRequestException(
        'Para pagos de arriendo se requiere id_sala',
      );
    }

    if (
      createPagoDto.tipo_pago === TipoPago.ENTRADA &&
      !createPagoDto.id_evento
    ) {
      throw new BadRequestException(
        'Para pagos de entrada se requiere id_evento',
      );
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
      if (
        updatePagoDto.tipo_pago === TipoPago.ARRIENDO &&
        !updatePagoDto.id_sala &&
        !pago.id_sala
      ) {
        throw new BadRequestException(
          'Para pagos de arriendo se requiere id_sala',
        );
      }

      if (
        updatePagoDto.tipo_pago === TipoPago.ENTRADA &&
        !updatePagoDto.id_evento &&
        !pago.id_evento
      ) {
        throw new BadRequestException(
          'Para pagos de entrada se requiere id_evento',
        );
      }
    }

    Object.assign(pago, updatePagoDto);
    return await this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<void> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
  }

  async createMercadoPagoPreference(idInscripcion: number) {
    try {
      console.log('Buscando inscripción:', idInscripcion);

      const inscripcion = await this.inscripcionRepository.findOne({
        where: { id_inscripcion: idInscripcion },
        relations: ['evento', 'usuario'],
      });

      if (!inscripcion) {
        throw new NotFoundException('Inscripción no encontrada');
      }

      console.log('Inscripción encontrada:', {
        id: inscripcion.id_inscripcion,
        evento: inscripcion.evento?.nombre_evento,
        precio: inscripcion.evento?.precio_entrada,
      });

      if (!inscripcion.evento) {
        throw new BadRequestException(
          'La inscripción no tiene evento asociado',
        );
      }

      const precio = Number(inscripcion.evento.precio_entrada);
      if (isNaN(precio)) {
        throw new BadRequestException(
          'El precio del evento no es un número válido',
        );
      }

      if (precio <= 0) {
        throw new BadRequestException(
          'Este evento es gratuito, no requiere pago',
        );
      }

      console.log('Creando preferencia con precio:', precio);

      const preferenceData = {
        items: [
          {
            id: String(inscripcion.evento.id_evento),
            title: inscripcion.evento.nombre_evento.substring(0, 256),
            description: (
              inscripcion.evento.descripcion || 'Entrada al evento'
            ).substring(0, 256),
            quantity: 1,
            unit_price: precio,
            currency_id: 'CLP',
          },
        ],
        external_reference: `inscripcion-${idInscripcion}`,
      };

      console.log(
        'Datos de preferencia:',
        JSON.stringify(preferenceData, null, 2),
      );

      const preference = new Preference(this.client);
      const result = await preference.create({
        body: preferenceData,
      });

      console.log('Preferencia creada exitosamente:', result.id);

      return {
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
      };
    } catch (error) {
      console.error('Error creando preferencia de Mercado Pago:', error);
      if (error.response) {
        console.error(
          'Respuesta de MP:',
          JSON.stringify(error.response, null, 2),
        );
      }
      console.error('Detalles del error:', error.message, error.stack);
      throw new BadRequestException(
        error.message || 'Error al crear preferencia de pago',
      );
    }
  }

  async handleMercadoPagoWebhook(body: any) {
    try {
      console.log('Webhook recibido:', body);

      if (body.type === 'payment') {
        const externalReference = body.data?.external_reference;

        if (externalReference) {
          const idInscripcion = parseInt(externalReference.split('-')[1]);
          const inscripcion = await this.inscripcionRepository.findOne({
            where: { id_inscripcion: idInscripcion },
          });

          if (inscripcion) {
            inscripcion.estado_pago = 'pagado' as any;
            await this.inscripcionRepository.save(inscripcion);
            console.log(`Inscripción ${idInscripcion} marcada como pagada`);
          }
        }
      }

      return { received: true };
    } catch (error) {
      console.error('Error procesando webhook:', error);
      return { received: false };
    }
  }
}
