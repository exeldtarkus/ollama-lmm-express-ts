import EnvironmentManager, {TypeEnv} from 'tarkus-env-manager';

const envSchema = TypeEnv.object({
  // === APP CONFIG ===
  APP_ENV: TypeEnv.enum(['dev', 'production', 'test']),
  APP_DEBUG: TypeEnv.string()
    .transform(val => val === 'true')
    .pipe(TypeEnv.boolean()),
  APP_URL: TypeEnv.string().default('localhost'),
  APP_PORT: TypeEnv.string().default('8010'),
  APP_STATIC_TOKEN: TypeEnv.string(),
  APP_TIMEZONE: TypeEnv.string().default('Asia/Jakarta'),

  // === JWT & TOKENS ===
  APP_ACCESS_TOKEN_SECRET: TypeEnv.string(),
  APP_REFRESH_TOKEN_SECRET: TypeEnv.string(),
  APP_USER_DEFAULT_PASSWORD: TypeEnv.string(),

  // === Services ===
  GOOGLE_MAPS_BASE_URL: TypeEnv.string()
    .url()
    .default('https://maps.googleapis.com/maps'),
  GOOGLE_MAPS_API_KEY: TypeEnv.string(),
  OLLAMA_BASE_URL: TypeEnv.string().url().default('localhost:11434/'),
  OLLAMA_LEARNING_MODEL: TypeEnv.string().default('llama3'),
});

const EnvManager = new EnvironmentManager<typeof envSchema>(envSchema);
const env = EnvManager.getEnv();

export {EnvManager};
export default env;
