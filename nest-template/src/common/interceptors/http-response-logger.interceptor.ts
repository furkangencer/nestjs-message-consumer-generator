import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { Environment } from '../enums';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class HttpResponseLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: PinoLogger,
    private configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode: status } = context.switchToHttp().getResponse();
    const { originalUrl, method } = req;

    const canShowLog =
      this.configService.get('env') !== Environment.TEST &&
      !isRabbitContext(context);

    return next.handle().pipe(
      tap({
        next: (val) => {
          if (canShowLog) {
            this.logger.info(
              {
                response: val,
                status,
                method,
                url: originalUrl,
              },
              '[Response]',
            );
          }
        },
        error: (error) => {
          if (canShowLog) {
            const { response, status } = error;
            this.logger.error(
              {
                response,
                status,
                method,
                url: originalUrl,
              },
              '[Error]',
            );
          }
        },
      }),
    );
  }
}
