// node --experimental-modules es-module.mjs

//ESM中可以导入 Commonjs模块
import mod from './commonjs.js';
console.log(mod); // { foo: 'commonjs exports value foo' }

//不能直接提取成员，注意import不是解构导出对象
import { default as foo, baz } from './commonjs.js';
console.log(foo, baz); //{ foo: 'commonjs exports value foo' },undefined
import * as a from './commonjs.js';
console.log(a);
// {
//   baz: undefined,
//   default: { foo: 'commonjs exports value foo' }
// }

// export const foo = 'es module export value';
