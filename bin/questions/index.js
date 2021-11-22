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
        name: 'RabbitMQ',
      },
    ],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'mongoose',
    message: 'Do you want to use Mongoose?',
    default: false,
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Project description:',
    default: '',
  },
];
