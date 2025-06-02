// src/services/OllamaService.ts

import {IRepository} from '../repositories/i.repository';
import {logger} from '../configs/logger.config';
import env from '../configs/env.config';
import {IOllamaResponseModel} from '../models/resource_models/i.ollama.model';
import AxiosCreated from '../configs/axios.config';

const apiClient = AxiosCreated({
  baseURL: env.OLLAMA_BASE_URL,
});

const logTemplate = '[OllamaService]';

class OllamaService implements IRepository {
  static async generatePrompt(
    prompt: string,
  ): Promise<IOllamaResponseModel | null> {
    const requestBody = {
      prompt,
      model: env.OLLAMA_LEARNING_MODEL,
      stream: false,
    };

    const response = await apiClient.post('/api/generate', requestBody, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Content-Type': 'application/json',
      },
    });

    logger.info(logTemplate, '[searchPrompt]', response.data);
    return response.data as IOllamaResponseModel;
  }
}

export {OllamaService};
