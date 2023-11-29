import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AppController } from './airport.controller';

@Module({
  controllers: [AppController],
  providers: [AirportService],
})
export class AirportModule {}
