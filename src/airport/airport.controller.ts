import { Controller, Get, Param, Query } from '@nestjs/common';
import  {AirportService}  from './airport.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AirportService) {}

  @Get('/info-aeroportos/:aeroporto')
  async getInfoAeroportos(@Param('aeroporto') aeroporto: string): Promise<any> {
    return this.appService.getInfoAeroportos(aeroporto);
  }

  @Get('/info-meteorologica/:cod')
  async getInfoMeteorologica(@Param('cod') cod: string): Promise<any> {
    return this.appService.getInfoMeteorologica(cod);
  }

  @Get(`/pesquisa`)
  async getPesquisa(@Query() query: { state: string; key_word: string; data: string }): Promise<any> {
    return this.appService.getPesquisa(query);
  }
}

