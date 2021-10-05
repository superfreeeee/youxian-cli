const chalk = require('chalk');

/**
 * 普通输出
 * @param  {...any} text
 * @returns
 */
const log = (...text) => console.log(chalk.white(...text));

/**
 * 标题（粗体）
 * @param  {...any} text
 * @returns
 */
const bold = (...text) => console.log(chalk.bold(...text));

/**
 * 提示（蓝色）
 * @param  {...any} text
 * @returns
 */
const info = (...text) => console.log(chalk.cyan(...text));

/**
 * 成功（绿色）
 * @param  {...any} text
 * @returns
 */
const success = (...text) => console.log(chalk.green(`✔`, ...text));

/**
 * 警告（黄色）
 * @param  {...any} text
 * @returns
 */
const warning = (...text) => console.log(chalk.yellow(`!`, ...text));

/**
 * 错误（红色）
 * @param  {...any} text
 * @returns
 */
const error = (...text) => console.log(chalk.red(`✘`, ...text));

/**
 * 分组输出
 * @param {string} tag
 * @param {() => void} cb
 */
const group = (tag, cb) => {
  console.group(tag);
  cb();
  console.groupEnd();
};

const Log = {
  log,
  bold,
  info,
  success,
  warning,
  error,
  group,
};

module.exports = Log;
