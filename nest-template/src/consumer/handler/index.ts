import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { PinoLogger } from 'nestjs-pino';
import { EXAMPLE_CONFIG } from '../config';

@Injectable()
export class ExampleConsumer {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(ExampleConsumer.name);
  }

  @RabbitSubscribe(EXAMPLE_CONFIG)
  public async handler(msg: Record<string, unknown>, amqpMsg: ConsumeMessage) {
    try {
      this.logger.info(JSON.stringify(msg));
      this.logger.info(JSON.stringify(amqpMsg.fields));
    } catch (error) {
      this.logger.error(error);
      return new Nack(false);
    }
  }
}
