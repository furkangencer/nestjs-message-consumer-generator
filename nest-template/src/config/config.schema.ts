import * as Joi from 'joi';
import { Environment, LogLevel } from '../common/enums';

export const configValidationSchema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.DEVELOPMENT),
  PORT: Joi.number().default(3000),
  // DB_HOST: Joi.string().required(),
  // DB_PORT: Joi.number().required(),
  // DB_USERNAME: Joi.string().required(),
  // DB_PASSWORD: Joi.string().required(),
  // DB_DATABASE: Joi.string().required(),
  LOG_LEVEL: Joi.string()
    .valid(...Object.values(LogLevel))
    .default(LogLevel.INFO),
  RABBITMQ_CONNECTION_URL: Joi.string().required(),
  HTTP_TIMEOUT: Joi.number().default(10000),
  EXAMPLE_SERVICE_URL: Joi.string().required(),
  SENTRY_DSN: Joi.string().required(),
  SENTRY_RELEASE: Joi.string().default(''),
  SENTRY_ENVIRONMENT: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.DEVELOPMENT),
});
