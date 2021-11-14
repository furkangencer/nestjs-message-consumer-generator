import { HttpException, HttpStatus } from '@nestjs/common';
import { IServiceCallerExceptionBody } from '../interfaces';

export class ServiceCallerException extends HttpException {
  constructor(
    body: IServiceCallerExceptionBody,
    status = HttpStatus.BAD_REQUEST,
  ) {
    super(body, status);
  }
}
