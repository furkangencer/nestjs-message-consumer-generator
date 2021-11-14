import { Environment, Service } from '../common/enums';

export const config = () => ({
  env: process.env.NODE_ENV,
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
  port: parseInt(process.env.PORT, 10) || 3000,
  // database: {
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT, 10) || 5432,
  //   name: process.env.DB_DATABASE,
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   sync: process.env.NODE_ENV === Environment.DEVELOPMENT,
  //   ssl: process.env.NODE_ENV === Environment.PRODUCTION,
  // },
  logger: {
    level: process.env.LOG_LEVEL,
    prettyPrint: process.env.NODE_ENV !== Environment.PRODUCTION,
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
    autoLogging: false,
    quietReqLogger: true,
    base: {
      pid: undefined,
    },
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_CONNECTION_URL,
    connectionInitOptions: { wait: false },
    prefetchCount: 1,
  },
  services: {
    urls: {
      [Service.Example]: process.env.EXAMPLE_SERVICE_URL || '',
    },
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 10000,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    release:
      process.env.SENTRY_RELEASE ||
      `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  },
});
