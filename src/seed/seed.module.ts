import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { EventosModule } from '../eventos/eventos.module'; 

@Module({
  imports: [EventosModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
