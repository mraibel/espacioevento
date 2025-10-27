import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';
import { SeedModule } from './seed/seed.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'espacioeventodb',
    autoLoadEntities: true,
    synchronize: true, //Solo para desarrollo
  }), EventosModule, SeedModule, UsuariosModule, SalasModule, InscripcionesModule, PagosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
