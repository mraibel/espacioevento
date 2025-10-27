import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { EventosModule } from '../eventos/eventos.module'; 
import { SalasModule } from 'src/salas/salas.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [EventosModule, SalasModule, UsuariosModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
