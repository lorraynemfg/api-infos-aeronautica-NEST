import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './airport.controller';
import { AirportService } from './airport.service';

describe('AirportController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AirportService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
