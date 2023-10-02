ExpressJsEnvironmentTemplate = `
import * as dotenv from 'dotenv';
dotenv.config()

export const ENVIRONMENT = {
    APP: {
        NAME: process.env.APP_NAME,
        PORT: process.env.PORT || 3000,
        ENV: process.env.APP_ENV
    },
    {{additional_environment_variables}}
}
`;
