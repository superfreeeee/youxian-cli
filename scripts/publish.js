const { version } = require('../package.json');

console.log(`version = ${version}`);
const [a, b, c] = version.split('.');
const nextVersion = `${a}.${b}.${+c + 1}`;
console.log(`nextVersion = ${nextVersion}`);
