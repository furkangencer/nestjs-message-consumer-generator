import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import { AsyncHooksModule } from '@nestjs-steroids/async-context';
import {
  HttpRequestIdMiddleware,
  HttpRequestLoggerMiddleware,
} from './common/middlewares';
import { HttpExceptionFilter } from './common/filters';
import {
  HttpResponseLoggerInterceptor,
  SentryInterceptor,
} from './common/interceptors';
import { config, configValidationSchema } from './config';
import { ConsumerModule } from './consumer/consumer.module';
import { ServiceCallerModule } from './service-caller/service-caller.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
      load: [config],
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const loggerConfig = await configService.get('logger');
        return {
          pinoHttp: loggerConfig,
        };
      },
    }),
    AsyncHooksModule,
    ServiceCallerModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('services'),
    }),
    ConsumerModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpRequestIdMiddleware, HttpRequestLoggerMiddleware)
      .forRoutes(HealthController);
  }
}
