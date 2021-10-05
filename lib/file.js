const { readFileSync, existsSync, mkdirSync, readdirSync, writeFileSync, statSync } = require('fs');
const path = require('path');

const Log = require('./logger');

/**
 * 读文件封装
 * @param {*} filePath
 * @returns
 */
const readFileSave = (filePath) => {
  try {
    return JSON.parse(readFileSync(filePath));
  } catch (e) {
    Log.error(`[readFileSave] fail`);
    Log.error(e.message);
    Log.error(e.stack);
    throw e;
  }
};

/**
 * 写文件封装
 * @param {*} data
 * @param {string} filePath
 */
const writeFileSave = (filePath, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  try {
    writeFileSync(filePath, data);
  } catch (e) {
    Log.error(`[writeFileSave] fail`);
    Log.error(e.message);
    Log.error(e.stack);
  }
};

const whiteList = ['.DS_Store'];

/**
 * 确保目录存在
 * @param {*} targetDir
 */
const ensureDirExist = (targetDir) => {
  if (existsSync(targetDir)) {
    // 1. 目录已存在
    const dir = readdirSync(targetDir);
    if (dir.filter((filename) => !whiteList.includes(filename)).length > 0) {
      throw new Error(`target directory is not empty: ${targetDir}`);
    }
  } else {
    // 2. 创建新目录
    mkdirSync(targetDir);
  }
};

/**
 * 复制所有文件到目标目录
 * @param {*} fromDir
 * @param {*} targetDir
 * @param {*} excludes
 */
const copyFiles = (fromDir, targetDir, excludes = []) => {
  const files = readdirSync(fromDir).filter((name) => !excludes.includes(name));
  files.forEach((fileName) => {
    const source = path.resolve(fromDir, fileName);
    const target = path.resolve(targetDir, fileName);

    const stats = statSync(source);
    if (stats.isDirectory()) {
      // 嵌套目录
      if (!existsSync(target)) {
        mkdirSync(target);
      }

      copyFiles(source, target, excludes);
    } else {
      // 一般文件
      const file = readFileSync(source);
      writeFileSync(target, file);
    }
  });
};

module.exports = {
  readFileSave,
  writeFileSave,
  ensureDirExist,
  copyFiles,
};
