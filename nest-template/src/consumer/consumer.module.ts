import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExampleConsumer } from './handler';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const rabbitmqOptions = await configService.get('rabbitmq');

        return rabbitmqOptions;
      },
    }),
  ],
  providers: [ExampleConsumer],
})
export class ConsumerModule {}
