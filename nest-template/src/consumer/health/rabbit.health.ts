import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { fromEvent, mapTo, merge, Observable, of } from 'rxjs';

@Injectable()
export class RabbitMQHealthIndicator extends HealthIndicator {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = this.check();
    const result = this.getStatus('RabbitMQ', isHealthy);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('RabbitMQ health check failed', result);
  }

  check(): boolean {
    return this.amqpConnection.managedConnection.isConnected();
  }

  watch(): Observable<boolean> {
    return merge(
      of(this.check()),
      fromEvent(this.amqpConnection.managedConnection, 'close').pipe(
        mapTo(false),
      ),
      fromEvent(this.amqpConnection.managedConnection, 'error').pipe(
        mapTo(false),
      ),
      fromEvent(this.amqpConnection.managedConnection, 'connect').pipe(
        mapTo(true),
      ),
    );
  }
}
