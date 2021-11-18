import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { AsyncContext } from '@nestjs-steroids/async-context';

@Injectable()
export class HttpRequestIdMiddleware implements NestMiddleware {
  constructor(private readonly asyncHook: AsyncContext) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    const requestId: string = headers['x-request-id'] || uuid();

    headers['x-request-id'] = requestId;
    headers['x-req-start'] = Date.now().toString();
    this.asyncHook.register();
    this.asyncHook.set('requestId', requestId);
    next();
  }
}
