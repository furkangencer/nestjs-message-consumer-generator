import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { RabbitMQHealthIndicator } from '../consumer/health/rabbit.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private rabbitmqHealthIndicator: RabbitMQHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.rabbitmqHealthIndicator.isHealthy(),
    ]);
  }
}
