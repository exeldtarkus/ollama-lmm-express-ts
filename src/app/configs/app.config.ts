import env from './env.config';

const appConfig = {
  debug: env.APP_DEBUG === true,
};

export {appConfig as config};
