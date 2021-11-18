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
    private rabbitmqHealthIndicator: RabbitMQHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.rabbitmqHealthIndicator.isHealthy(),
      () => this.db.pingCheck('MongoDB'),
    ]);
  }
}
