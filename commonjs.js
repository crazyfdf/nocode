//CommonJS模块始终只会导出一个默认成员
//这也就意味着只能通过import载入默认成员方式引入

module.exports = {
  foo: 'commonjs exports value foo',
};

exports.baz = 'commonjs exports value baz';

console.log('---------------------------------------');

// node --experimental-modules commonjs.js
//不能在 CommonJS模块中通过require 载入 ESM
// const mod = require('./es-module.mjs');
// console.log(mod); //报错
