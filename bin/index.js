#!/usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

const questions = require('./questions');
const { createProject } = require('./utils');

inquirer.prompt(questions).then((answers) => {
  const spinner = ora('Creating project').start();

  const nestTemplatePath = path.join(__dirname, '../nest-template');
  const destinationPath = path.join(process.cwd(), answers.projectName);

  createProject(
    nestTemplatePath,
    destinationPath,
    answers,
    () => {
      spinner.succeed('Project created successfully');
    },
  );
});
