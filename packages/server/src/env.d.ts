declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_NAME: string;
    DATABASE_PASSWORD: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
  }
}
