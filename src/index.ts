/* eslint-disable n/no-process-exit */
import app from './app';
import {logger} from './app/configs/logger.config';
import env, {EnvManager} from './app/configs/env.config';

const port = env.APP_PORT;

app.listen(port, async () => {
  logger.info('⏳ [Open]  : Loading Required Data and File ...');

  EnvManager.check();

  logger.info(
    `${logger.utils.chalk.yellow('⚡️')} [server]: Running at`,
    logger.utils.chalk.underline(`http://localhost:${port}`),
  );
  logger.info(
    `${logger.utils.chalk.yellow('🛠️')}  [Mode]  : ${logger.utils.chalk.underline(env.APP_ENV)} ${env.APP_DEBUG ? '- DEBUG' : ''}`,
  );
});

export default app;
