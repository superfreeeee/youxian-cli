const clear = require('clear');
const figlet = require('figlet');
const path = require('path');

const Log = require('./logger');
const { readTemplatesChoices, copyPackageJson, hasPackageJson } = require('./config');
const { ask } = require('./question');
const { mixin } = require('./utils');
const { ensureDirExist, copyFiles } = require('./file');
const { execCommand } = require('./shell');
const spinner = require('./spinner');

/**
 * 创建项目总入口
 */
const createProject = async ({ version, relativePath, projectName, targetDir }) => {
  try {
    console.log(`currentVersion   : ${version}`);
    console.log(`relativePath     : ${relativePath}`);
    console.log(`projectName      : ${projectName}`);
    console.log(`targetDir        : ${targetDir}`);

    const customConfig = {};

    init(version);
    mixin(customConfig, await chooseTemplate(projectName));
    mixin(customConfig, await detailConfig());

    const templateDir = path.resolve(__dirname, '../templates', customConfig.template);

    await buildProject({ templateDir, targetDir, customConfig });
    await installDependencies({ targetDir });

    await postCreateHint({ relativePath, projectName, targetDir });
  } catch (e) {
    Log.error(e);
  }
};

/**
 * 1. 初始化
 * @param {*} version
 */
const init = (version) => {
  clear();
  Log.bold(`@youxian/cli ${version}`);
  Log.log(figlet.textSync('yx-cli', 'Ghost'));
};

/**
 * 2. 选择项目类型
 */
const chooseTemplate = async (projectName) => {
  // { type: 'xxx' }
  return await ask([
    {
      type: 'input',
      message: 'Project name: ',
      name: 'name',
      default: projectName,
    },
    {
      type: 'input',
      name: 'author',
      default: 'superfree',
    },
    {
      type: 'list',
      message: '选择创建项目类型',
      name: 'template',
      choices: readTemplatesChoices(),
    },
  ]);
};

/**
 * 3. 详细配置
 */
const detailConfig = async () => {
  return {};
};

/**
 * 4. 创建项目
 */
const buildProject = async ({ templateDir, targetDir, customConfig }) => {
  // 1. 确保目标目录存在
  ensureDirExist(targetDir);

  // 2. 复制 package.json
  copyPackageJson(templateDir, targetDir, customConfig);
  // 3. 复制其他文件
  copyFiles(templateDir, targetDir, ['package.json', 'node_modules']);
};

/**
 * 5. 安装依赖
 */
const installDependencies = async ({ targetDir }) => {
  if (hasPackageJson(targetDir)) {
    try {
      spinner.start('yarn install ...');
      const { stdout } = await execCommand('yarn', targetDir);
      spinner.success('yarn install succeed');
      Log.log(stdout);
    } catch (e) {
      Log.error(e);
      spinner.error('yarn install fail');
    }
  }
};

/**
 * 6. 安装完成后提示可用操作
 */
const postCreateHint = async ({ relativePath, projectName, targetDir }) => {
  if (hasPackageJson(targetDir)) {
    if (relativePath !== '.') {
      Log.log('press command to enter project');
      Log.info(`    cd ${projectName}`);
    }
    Log.log(`press command to run project`);
    Log.info(`    yarn start`);
    Log.log(`press command to build project`);
    Log.info(`    yarn build`);
  } else {
    Log.log('copy following path to browser');
    Log.info(`    ${targetDir}/index.html`);
  }
};

module.exports = createProject;
