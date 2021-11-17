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
