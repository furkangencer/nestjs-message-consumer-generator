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

    const status = exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    const {
      error,
      message,
      code,
      constraints,
      property,
      data,
      service,
      isService,
    } = exception?.response || ERROR_MESSAGES.UNKNOWN;

    if (isService) {
      response.status(status).json({
        error: ERROR_MESSAGES.MICROSERVICE.error,
        message: ERROR_MESSAGES.MICROSERVICE.message,
        code: ERROR_MESSAGES.MICROSERVICE.code,
        constraints,
        property,
        data,
        service,
        isService,
      });
    } else {
      response.status(status).json({
        code,
        constraints,
        error,
        message,
        property,
        data,
      });
    }
  }
}
