// src/services/GoogleServices.ts

import {IRepository} from '../repositories/i.repository';
import https from 'https';
import {IGoogleMapsResponseModels} from '../models/resource_models/i.google.maps.model';
import {logger} from '../configs/logger.config';
import env from '../configs/env.config';
import AxiosCreated from '../configs/axios.config';

const apiClient = AxiosCreated({
  baseURL: env.GOOGLE_MAPS_BASE_URL,
  httpsAgent: new https.Agent({rejectUnauthorized: false}),
});

const logTemplate = '[GoogleServices]';

class GoogleServices implements IRepository {
  static async mapSearchPlace(
    query: string,
  ): Promise<IGoogleMapsResponseModels | null> {
    const params = {
      query,
      key: env.GOOGLE_MAPS_API_KEY,
    };

    const response = await apiClient.get('/api/place/textsearch/json', {
      params,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Content-Type': 'application/json',
      },
    });

    logger.info(logTemplate, '[searchPlace]', '[response]', response.data);
    return response.data as IGoogleMapsResponseModels;
  }
}

export {GoogleServices};
