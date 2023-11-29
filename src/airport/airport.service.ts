import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Airport from './dto/create-airport.dto';
import { apiKey, apiKey1 } from './dto/apiKeys/apiKeys';
import WeatherData, { translateWeather } from './entities/weather.entity';

@Injectable()
export class AirportService {
  async getInfoAeroportos(aeroporto: string): Promise<any> {
    try {
      const response = await axios.get(`https://api-redemet.decea.mil.br/aerodromos/?api_key=${apiKey}&pais=${aeroporto}`);
      const array = response.data.data;

      if (array.length < 1) {
        return { mensagem: 'Aeroporto não encontrado.' };
      }

      const airports = array.map(({ nome, cidade, cod }: { nome: string, cidade: string, cod: string }) => new Airport(nome, cidade, cod));

      const holeAnswer = {
        totalDeAeroportosEncontrados: array.length,
        Aeroportos: airports,
      };

      return holeAnswer;
    } catch (error) {
      return { error: 'Erro ao obter informações meteorológicas.' };
    }
  }

  async getInfoMeteorologica(cod: string): Promise<any> {
    try {
      const responseMens = await axios.get(`https://api-redemet.decea.mil.br/mensagens/metar/${cod}?api_key=${apiKey}`);
      const responseStatus = await axios.get(`https://api-redemet.decea.mil.br/aerodromos/status/localidades/${cod}?api_key=${apiKey}`)
      const status = responseStatus.data.data[0][4]

      delete responseMens.data.data.data[0].id_localidade
      delete responseMens.data.data.data[0].validade_inicial

      const mensTraduzida: WeatherData = translateWeather(responseMens.data.data.data[0]);
      if (status == 'g') {
        responseMens.data.data.data[0].mensagem = { ...mensTraduzida, status: 'great' };
      }
      if (status == 'y') {
        responseMens.data.data.data[0].mensagem = { ...mensTraduzida, status: 'yellow' };
      }
      if (status == 'r') {
        responseMens.data.data.data[0].mensagem = { ...mensTraduzida, status: 'red' };
      }

      return responseMens.data.data.data[0];
    } catch (error) {
      return { error: 'Erro ao obter informações meteorológicas.' };
    }
  }

  async getPesquisa(query: { state: string; key_word: string; data: string }): Promise<any> {
    const { state, key_word, data } = query;

    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${state}${' '}${key_word}&from=${data}&sortBy=publishedAt&apiKey=${apiKey1}`);
      const newsData = response.data.articles;

      const dataDescription: string[] = newsData.map((i: { description: string }) => i.description);
      const dataAuthor: string[] = newsData.map(({ author }: { author: string }) => author);
      const dataUrl: string[] = newsData.map((i: { url: string }) => i.url);

      const objet = {
        dataAuthor,
        dataDescription,
        url: dataUrl,
      };

      return objet;
    } catch (error) {
      return { mensagem: 'Erro interno do servidor' };
    }
  }
}
