const { existsSync } = require('fs');
const path = require('path');
const prettier = require('prettier');

const { readFileSave, writeFileSave } = require('./file');

const _packageJsonCache = new Map();
/**
 * 读取 package.json 配置
 * @param {*} targetDir
 * @returns
 */
const readPackageJson = (targetDir) => {
  // 1. 读缓存
  const absolutePath = path.resolve(targetDir, 'package.json');
  if (_packageJsonCache.has(absolutePath)) {
    return _packageJsonCache.get(absolutePath);
  }

  // 2. 重新读 & 写入缓存
  const config = readFileSave(absolutePath);
  _packageJsonCache.set(absolutePath, config);
  return config;
};

/**
 * 读取模版选项
 * @returns
 */
const readTemplatesChoices = () => {
  const templatesConfigPath = path.resolve(__dirname, '../templates/templates.json');
  const config = readFileSave(templatesConfigPath);
  return config;
};

/**
 * 复制 package.json 配置文件
 * @param {string} templateDir
 * @param {string} targetDir
 * @param {*} config
 */
const copyPackageJson = (templateDir, targetDir, { name, author }) => {
  if (!hasPackageJson(templateDir)) {
    return;
  }
  const templatePackageJsonPath = path.resolve(templateDir, 'package.json');
  const defaultConfig = readFileSave(templatePackageJsonPath);

  defaultConfig.name = name;
  defaultConfig.author = author;

  writeFileSave(
    path.resolve(targetDir, 'package.json'),
    prettier.format(JSON.stringify(defaultConfig), { parser: 'json-stringify' })
  );
};

/**
 * 检查是否存在 package.json
 * @param {*} targetDir
 * @returns
 */
const hasPackageJson = (targetDir) => {
  const templatePackageJsonPath = path.resolve(targetDir, 'package.json');
  return existsSync(templatePackageJsonPath);
};

module.exports = { readPackageJson, readTemplatesChoices, copyPackageJson, hasPackageJson };
