import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.pagosService.findAll();
  }

  @Get('usuario/:id_usuario')
  @Auth()
  findByUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number) {
    return this.pagosService.findByUsuario(id_usuario);
  }

  @Get('evento/:id_evento')
  @Auth(ValidRoles.admin, ValidRoles.organizer)
  findByEvento(@Param('id_evento', ParseIntPipe) id_evento: number) {
    return this.pagosService.findByEvento(id_evento);
  }

  @Get('sala/:id_sala')
  @Auth(ValidRoles.organizer, ValidRoles.admin)
  findBySala(@Param('id_sala', ParseIntPipe) id_sala: number) {
    return this.pagosService.findBySala(id_sala);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.findOne(id);
  }

  @Post('mercadopago/create-preference')
  @HttpCode(HttpStatus.OK)
  @Auth()
  createMercadoPagoPreference(@Body() body: { id_inscripcion: number }) {
    return this.pagosService.createMercadoPagoPreference(body.id_inscripcion);
  }

  @Post('mercadopago/webhook')
  @HttpCode(HttpStatus.OK)
  mercadoPagoWebhook(@Body() body: any) {
    return this.pagosService.handleMercadoPagoWebhook(body);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ) {
    return this.pagosService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.remove(id);
  }
}
