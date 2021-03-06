import { ackErrorHandler } from '@golevelup/nestjs-rabbitmq';

export const EXAMPLE_HANDLER_CONFIG = {
  exchange: 'my-topic-exchange',
  routingKey: 'test-routing-key',
  queue: 'nest-queue',
  errorHandler: ackErrorHandler,
};
