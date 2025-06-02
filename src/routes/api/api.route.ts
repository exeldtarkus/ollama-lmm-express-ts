import express from 'express';
import {ollamaRouter} from './ollama.route';
const router = express.Router();

router.use('/ollama', ollamaRouter);

export {router as apiRouter};
