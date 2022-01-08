<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="240" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.rabbitmq.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/rabbitmq.svg" width="30" alt="RabbitMQ" /></a>
  <a href="https://kafka.apache.org/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/kafka.svg" width="22" hspace="20" alt="Kafka" /></a>
  <a href="https://nats.io/" target="blank"><img src="https://cncf-branding.netlify.app/img/projects/nats/icon/color/nats-icon-color.svg" width="30" alt="NATS" /></a>
</p>

## Message Consumer Generator

This template is built with [NestJS](https://github.com/nestjs/nest) framework and is part of `nestjs-message-consumer-generator` which basically generates a <b>message consumer</b> according to your preferences through CLI.

Currently, it only supports RabbitMQ as message broker.

### Features
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

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Roadmap
* Kafka
* NATS
* TypeORM