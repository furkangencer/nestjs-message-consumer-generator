const fs = require('fs');
const spawn = require('child_process').spawn;

const createProject = (src, dest, answers, callback) => {
  const { messageBroker, projectName, projectDescription } = answers;

  const commands = [
    `mkdir -p ${dest}`,
    `rsync -av --progress --exclude 'node_modules' ${src}/ ${dest}/`,
  ];
  const messageBrokerPluginCommands = {
    rabbitmq: `cd ${dest}/ && npm i --save amqplib amqp-connection-manager @golevelup/nestjs-rabbitmq`,
    nats: `cd ${dest}/ && npm i --save nats`,
    kafka: `cd ${dest}/ && npm i --save kafkajs`,
  };

  commands.push(messageBrokerPluginCommands[messageBroker]);

  var process = spawn(commands.join(' && '), {
    shell: true,
  });

  process.on('exit', async () => {
    await changeProjectNameAndDescription(
      dest,
      projectName,
      projectDescription,
    );
    callback();
  });
};

const changeProjectNameAndDescription = (
  dir,
  projectName,
  projectDescription,
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dir}/package.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const updatedPackageJson = data
        .replace(/\bproject_name\b/g, projectName)
        .replace(/\bproject_description\b/g, projectDescription);

      fs.writeFile(`${dir}/package.json`, updatedPackageJson, 'utf8', (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
};

module.exports = {
  createProject,
};
