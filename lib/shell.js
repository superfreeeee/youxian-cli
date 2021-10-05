const { promisify } = require('util');
const { exec } = require('child_process');

const Log = require('./logger');

const execPromise = promisify(exec);

/**
 * 执行命令
 * @param {*} command
 * @param {*} targetDir
 */
const execCommand = (command, targetDir) => {
  return execPromise(command, { cwd: targetDir });
};

module.exports = {
  execCommand,
};
