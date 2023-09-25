export const ENVIRONMENT = () => `
import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
  };
  DB: {
    URL: string;
    NAME: string;
    USER: string;
    PASSWORD: string;
    PORT: number;
    HOST: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.APP_PORT,
    ENV: process.env.APP_ENV,
  },
  DB: {
    URL: process.env.DB_URL,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: +process.env.DB_PORT,
    HOST: process.env.DB_HOST,
  },
};
`