const chalk = require('chalk');
const ora = require('ora');

const spinner = ora();

const start = (text) => {
  spinner.text = chalk.cyan(text);
  spinner.start();
};

const stop = (text) => {
  spinner.stopAndPersist(text);
};

const success = (text) => {
  spinner.succeed(chalk.green(text));
};

const error = (text) => {
  stop(chalk.red(text));
};

module.exports = {
  start,
  stop,
  success,
  error,
};
