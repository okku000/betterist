declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    REDIS_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
  }
}
