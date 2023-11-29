import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirportModule } from './airport/airport.module';

@Module({
  imports: [AirportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
