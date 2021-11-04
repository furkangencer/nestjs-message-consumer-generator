const path = require('path');
const { MINIMUM_PROJECT_NAME_LENGTH } = require('../constants');

module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What will the project name be?',
    default: path.basename(process.cwd()),
    filter(val) {
      return val.trim().toLowerCase();
    },
    validate(answer) {
      if (answer.length < MINIMUM_PROJECT_NAME_LENGTH) {
        return 'Project name is too short!';
      }
      return true;
    },
  },
  {
    type: 'list',
    name: 'messageBroker',
    message: 'Which message broker do you want to work with?',
    choices: [
      {
        name: 'NATS',
      },
      {
        name: 'RabbitMQ',
      },
      {
        name: 'Kafka',
      },
    ],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'typeOrm',
    message: 'Do you want to use TypeORM?',
    default: false,
  },
  {
    type: 'checkbox',
    name: 'tools',
    message: 'Would you like to enable 3rd party integrations?',
    choices: [
      {
        name: 'Sentry',
        value: 'sentry',
      },
      {
        name: 'New Relic',
        value: 'newrelic',
      },
    ],
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Project description:',
    default: '',
  },
];
