import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '../../constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (response.status) {
      const status =
        exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

      if (status === HttpStatus.SERVICE_UNAVAILABLE) {
        response.status(status).json({
          time: Date.now(),
          ...exception.response,
        });
      } else {
        const { error, message, code, constraints, property, data, service } =
          exception?.response || ERROR_MESSAGES.UNKNOWN;

        response.status(status).json({
          error,
          message,
          code,
          constraints,
          property,
          data,
          service,
        });
      }
    }
  }
}
