export const ENVIRONMENT_TEMPLATE = `
import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
  };
 {{environment_interface}}
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.APP_PORT,
    ENV: process.env.APP_ENV,
  },
 {{environment_content}}
};
`;
