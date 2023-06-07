const chalk = require('chalk');
const ora = require('ora');

const spinner = ora();

/**
 *
 * @param {string} text
 */
const start = (text) => {
  spinner.text = chalk.cyan(text);
  spinner.start();
};

/**
 *
 * @param {string} text
 */
const stop = (text) => {
  // @ts-ignore
  spinner.stopAndPersist(text);
};

/**
 *
 * @param {string} text
 */
const success = (text) => {
  spinner.succeed(chalk.green(text));
};

/**
 *
 * @param {string} text
 */
const error = (text) => {
  spinner.fail(chalk.red(text));
};

module.exports = {
  start,
  stop,
  success,
  error,
};
