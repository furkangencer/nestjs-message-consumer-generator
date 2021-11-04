const fs = require('fs');
const shell = require('child_process').execSync;

const copyFilesAndFolders = (src, dist) => {
  shell(`mkdir -p ${dist}`);
  shell(`cp -r ${src}/* ${dist}`);
};

const changeProjectNameAndDescription = (dir, projectName, projectDescription) => {
  const updatedPackageJson = fs.readFileSync(`${dir}/package.json`, 'utf8')
    .replace(/\bproject_name\b/g, projectName)
    .replace(/\bproject_description\b/g, projectDescription);
  fs.writeFileSync(`${dir}/package.json`, updatedPackageJson);
};

const installRabbitMQPlugin = (dir) => {
  shell(`cd ${dir}/ && npm i --save amqplib amqp-connection-manager`);
};

const installNatsPlugin = (dir) => {
  shell(`cd ${dir}/ && npm i --save nats`);
};

const installKafkaPlugin = (dir) => {
  shell(`cd ${dir}/ && npm i --save kafkajs`);
};

module.exports = {
  copyFilesAndFolders,
  changeProjectNameAndDescription,
  installMessageBrokerPlugin: {
    rabbitmq: installRabbitMQPlugin,
    nats: installNatsPlugin,
    kafka: installKafkaPlugin,
  },
};
