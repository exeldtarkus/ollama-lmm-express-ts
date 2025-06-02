import express, {Request, Response} from 'express';
import {apiRouter} from './api/api.route';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({title: 'Ollama-LMM-Services'});
});

router.use('/api', apiRouter);

export {router as indexRouter};
