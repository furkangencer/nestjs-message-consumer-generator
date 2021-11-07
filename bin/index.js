#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const { SingleBar, Presets } = require('cli-progress');

const questions = require('./questions');
const {
  copyFolder,
  changeProjectNameAndDescription,
  installMessageBrokerPlugin,
} = require('./utils');

inquirer
  .prompt(questions)
  .then((answers) => {
    // console.log(JSON.stringify(answers, null, '  '));
    process.stdout.write('\n');

    const progressBar = new SingleBar({
      hideCursor: true,
      stopOnComplete: true,
      barsize: 45,
      format: '\x1b[36mCreating the project:\x1b[0m {bar} {percentage}%',
    }, Presets.shades_classic);

    progressBar.start(100, 20);

    const nestTemplatePath = path.join(__dirname, '../nest-template');
    const destinationPath = path.join(process.cwd(), answers.projectName);

    copyFolder(nestTemplatePath, destinationPath);
    progressBar.update(30);

    installMessageBrokerPlugin[answers.messageBroker](destinationPath);
    progressBar.update(90);

    changeProjectNameAndDescription(destinationPath, answers.projectName, answers.projectDescription);
    progressBar.update(100);

    process.stdout.write('\n\n\x1b[32mProject created succesfully!\x1b[0m\n');
  })
  .catch((error) => {
    throw error;
  });
