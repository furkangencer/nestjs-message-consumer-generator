import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ExampleConsumer } from './handler';
import { RabbitMQHealthIndicator } from './health/rabbit.health';
import { Example, ExampleSchema } from './schemas/example.schema';
import { ExampleDataAccess } from './data-access/example.data-access';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('rabbitmq'),
    }),
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  providers: [ExampleConsumer, RabbitMQHealthIndicator, ExampleDataAccess],
  exports: [RabbitMQHealthIndicator],
})
export class ConsumerModule {}
