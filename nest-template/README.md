<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="240" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.rabbitmq.com/" target="blank"><img src="https://symbols.getvecta.com/stencil_94/4_rabbitmq-icon.3cf13acde7.svg" width="30" alt="RabbitMQ Logo" /></a>
  <a href="https://kafka.apache.org/" target="blank"><img src="https://symbols.getvecta.com/stencil_74/14_apache-kafka-icon.59d5c11ca8.svg" width="22" hspace="20" alt="Kafka Logo" /></a>
  <a href="https://nats.io/" target="blank"><img src="https://symbols.getvecta.com/stencil_89/21_nats-icon.598cfad807.svg" width="30" alt="NATS Logo" /></a>
</p>
<p align="center">Message Consumer Template</p>

## Description

This template is built with [NestJS](https://github.com/nestjs/nest) framework and it's part of getir-consumer-generator package which basically generates a <b>message consumer service</b> according to your preferences through the CLI.

Currently, it only supports RabbitMQ as message broker.

## Features
* Consumer module
* Mongoose
* Config Management w/ Joi Validation
* HTTP Request-Response Logging
* Custom Exceptions
* Constant Management
* Health Module
* Pino Logger
* Service-caller module
* Distributed Tracing
* Sentry
* New Relic


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Future plans
* Kafka
* NATS
* TypeORM