const fs = require('fs');
const spawn = require('child_process').spawn;

const createProject = (src, dest, answers, callback) => {
  const { messageBroker, mongoose, projectName, projectDescription } = answers;

  const commands = [
    `mkdir -p ${dest}`,
    `rsync -av --progress --exclude 'node_modules' --exclude 'dist' ${src}/ ${dest}/`,
  ];

  var process = spawn(commands.join(' && '), {
    shell: true,
  });

  process.on('exit', async () => {
    await changeProjectNameAndDescription(dest, projectName, projectDescription);
    if (!mongoose) {
      removeMongoose(dest);
    }
    npmInstall(dest, callback);
  });
};

const npmInstall = (dest, callback) => {
  const process = spawn(`cd ${dest}/ && npm install`, {
    shell: true,
  });
  process.on('exit', () => {
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

const removeMongoose = (dest) => {
  fs.rm(`${dest}/src/consumer/repositories`, { recursive: true, force: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.rm(`${dest}/src/consumer/schemas`, { recursive: true, force: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.copyFile(
    `${__dirname}/../assets/consumer/consumer.module.ts`,
    `${dest}/src/consumer/consumer.module.ts`,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  let packageJson = fs.readFileSync(`${dest}/package.json`, 'utf8');
  packageJson = packageJson
    .split('\n')
    .filter((line) => {
      return line.indexOf('mongoose') == -1;
    })
    .join('\n');

  fs.writeFileSync(`${dest}/package.json`, packageJson, 'utf8');
};

module.exports = {
  createProject,
};
