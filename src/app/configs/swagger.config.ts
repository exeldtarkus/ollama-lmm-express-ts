import {SwaggerDefinition} from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';
import env from './env.config';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LLM Smart Search API',
    version: '1.0.0',
    description:
      'API untuk mencari tempat menggunakan LLM lokal dan Google Maps',
  },
  servers: [
    {
      url: env.APP_URL,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/api/*.ts', 'src/docs/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
