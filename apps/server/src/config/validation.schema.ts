import * as Joi from 'joi';
import { Environment } from 'src/enums/env.enum';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(Environment.DEVELOPMENT, Environment.PRODUCTION)
    .default(Environment.DEVELOPMENT),

  PORT: Joi.number().default(3005),

  FRONT_END_URL: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  SALT_ROUNDS: Joi.number().required().default(10),

  ACCESS_SECRET: Joi.string().required(),
  ACCESS_EXPIRES_IN: Joi.string().required(),
  REFRESH_SECRET: Joi.string().required(),
  REFRESH_EXPIRES_IN: Joi.string().required(),
});
