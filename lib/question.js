const inquirer = require('inquirer');

/**
 * 简单问问题
 * @param {*} questions
 * @returns
 */
const ask = (questions = []) => {
  return inquirer.prompt(questions);
};

module.exports = {
  ask,
};
