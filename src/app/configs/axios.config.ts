import axios, {AxiosError, AxiosResponse, CreateAxiosDefaults} from 'axios';
import {logger} from './logger.config';

const AxiosCreated = (axiosCreate: CreateAxiosDefaults) => {
  const apiClient = axios.create({...axiosCreate, timeout: 10000 * 10});

  apiClient.interceptors.request.use(
    config => {
      logger.debug('[Axios Request] - Request started', config);
      return config;
    },
    (error: AxiosError) => {
      logger.error('[Axios Request Error]', error.message);
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response) {
        logger.error(
          '[Axios Response Error] - Server error',
          error.response.status,
          error.response.data,
        );
      } else if (error.request) {
        logger.error(
          '[Axios Response Error] - No response received',
          error.request,
        );
      } else {
        logger.error(
          '[Axios Response Error] - Error in setting up the request',
          error.message,
        );
      }

      return Promise.reject({
        status: error.response?.status || 500,
        message: error.message || 'An error occurred',
      });
    },
  );

  return apiClient;
};

export default AxiosCreated;
