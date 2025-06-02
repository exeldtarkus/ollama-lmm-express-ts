import express from 'express';
import * as controller from '../../app/https/controllers/ollama.controller';

const router = express.Router();

router.post('/smart-search', controller.smartSearch);

export {router as ollamaRouter};
