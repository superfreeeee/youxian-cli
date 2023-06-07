const Log = require('./logger');

const mixin = (originObj, ...others) => Object.assign(originObj, ...others);

const newLine = () => Log.log();

module.exports = {
  mixin,
  newLine,
};
