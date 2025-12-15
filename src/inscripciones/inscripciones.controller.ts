import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import {
  CreateInscripcioneDto,
  EstadoPago,
} from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth(ValidRoles.organizer, ValidRoles.admin)
  getAll() {
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  getOne(@Param('id') id: string) {
    return this.inscripcionesService.findOne(+id);
  }

  @Get('usuario/:id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  getByUsuario(@Param('id') id: string) {
    return this.inscripcionesService.findByUsuario(+id);
  }

  @Get('evento/:id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  getByEvento(@Param('id') id: string) {
    return this.inscripcionesService.findByEvento(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  create(@Body() dto: CreateInscripcioneDto) {
    return this.inscripcionesService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  update(@Param('id') id: string, @Body() dto: UpdateInscripcioneDto) {
    return this.inscripcionesService.update(+id, dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateInscripcioneDto) {
    return this.inscripcionesService.update(+id, dto);
  }

  @Patch(':id/pago')
  @HttpCode(HttpStatus.OK)
  @Auth()
  updateEstadoPago(
    @Param('id') id: string,
    @Body() body: { estado_pago: 'pendiente' | 'pagado' },
  ) {
    const estadoPago =
      body.estado_pago === 'pagado' ? EstadoPago.PAGADO : EstadoPago.PENDIENTE;
    return this.inscripcionesService.update(+id, { estado_pago: estadoPago });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  remove(@Param('id') id: string) {
    return this.inscripcionesService.remove(+id);
  }
}
