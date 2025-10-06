import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345678',
    database: 'espacioeventodb',
    autoLoadEntities: true,
    synchronize: true, //Solo para desarrollo
  }), EventosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
