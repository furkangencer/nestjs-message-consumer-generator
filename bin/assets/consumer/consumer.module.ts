import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ExampleConsumer } from './handler';
import { RabbitMQHealthIndicator } from './health/rabbit.health';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('rabbitmq'),
    }),
  ],
  providers: [ExampleConsumer, RabbitMQHealthIndicator],
  exports: [RabbitMQHealthIndicator],
})
export class ConsumerModule {}
