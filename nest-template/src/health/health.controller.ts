import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { RabbitMQHealthIndicator } from '../consumer/health/rabbit.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private rabbitmq: RabbitMQHealthIndicator,
    private mongodb: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const health = await this.health.check([
      () => this.rabbitmq.isHealthy(),
      () => this.mongodb.pingCheck('MongoDB'),
    ]);
    return {
      time: Date.now(),
      ...health,
    };
  }
}
