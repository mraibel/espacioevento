import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CrearEventoDto } from './dto/crear-evento.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth()
  getAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  getOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth(ValidRoles.admin, ValidRoles.organizer)
  create(@Body() dto: CrearEventoDto) {
    return this.eventosService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Auth(ValidRoles.admin, ValidRoles.organizer)
  update(@Param('id') id: string, @Body() dto: CrearEventoDto) {
    return this.eventosService.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(ValidRoles.admin, ValidRoles.organizer)
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }

}
