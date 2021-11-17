import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { PinoLogger } from 'nestjs-pino';
import { Service } from '../../common/enums';
import { ServiceCallerService } from '../../service-caller/service-caller.service';
import { EXAMPLE_HANDLER_CONFIG } from '../config';
import { IExampleMessage } from '../interfaces';

@Injectable()
export class ExampleConsumer {
  constructor(
    private readonly serviceCaller: ServiceCallerService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ExampleConsumer.name);
  }

  @RabbitSubscribe(EXAMPLE_HANDLER_CONFIG)
  public async handler(msg: IExampleMessage, amqpMsg: ConsumeMessage) {
    try {
      this.logger.info({ msg });
      // this.logger.info({ msgFields: amqpMsg.fields });

      await this.serviceCaller.call({
        service: Service.Example,
        method: 'POST',
        path: 'example',
        data: msg as Record<string, any>,
        headers: { test: '123' },
        params: { test: 123 },
      });
    } catch (error) {
      return new Nack();
    }
  }
}
