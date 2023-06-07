const { spawn } = require('child_process');

/**
 * 执行命令
 * @param {string} command
 * @param {string} targetDir
 */
const execCommand = (command, targetDir) => {
  const [cmd, ...params] = command.split(' ');
  const installProcess = spawn(cmd, params, { cwd: targetDir, stdio: 'inherit' });
  return new Promise((resolve, reject) => {
    installProcess.on('error', (err) => reject(err));
    installProcess.on('exit', (code, signal) => resolve({ code, signal }));
    installProcess.on('close', (code, signal) => resolve({ code, signal }));
  });
};

module.exports = {
  execCommand,
};
