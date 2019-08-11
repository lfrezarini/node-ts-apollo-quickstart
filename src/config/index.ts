import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export interface Config {
  HTTP_HOST: string;
  HTTP_PORT: number;
}
const configSchema = Joi.object({
  HTTP_HOST: Joi.string().required(),
  HTTP_PORT: Joi.number().required()
});

const config = {
  HTTP_HOST: process.env.HTTP_HOST,
  HTTP_PORT: process.env.HTTP_PORT
};

const validation = configSchema.validate<Config>(config as any);

if (validation.error) {
  // eslint-disable-next-line no-console
  console.error(validation.error);
  process.exit(1);
}

const { value: environment } = validation;

export { environment };
