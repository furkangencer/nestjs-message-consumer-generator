<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="240" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.rabbitmq.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/rabbitmq.svg" width="30" alt="RabbitMQ" /></a>
  <a href="https://kafka.apache.org/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/kafka.svg" width="22" hspace="20" alt="Kafka" /></a>
  <a href="https://nats.io/" target="blank"><img src="https://cncf-branding.netlify.app/img/projects/nats/icon/color/nats-icon-color.svg" width="30" alt="NATS" /></a>
</p>

## Message Consumer Generator

A handy generator with interactive CLI to create boilerplate <b>message consumer</b> in NestJS.

Currently, it only supports RabbitMQ as message broker.

### Preview
<img src="https://user-images.githubusercontent.com/20465844/148654803-ee9834b7-4cf3-4ec6-b928-b4dce9073234.gif" width="504" height="208"/>

### Installation

```bash
# install globally
$ npm install -g

# run
$ message-consumer-generator
```

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

### Roadmap
* Kafka
* NATS
* TypeORM