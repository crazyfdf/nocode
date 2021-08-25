let foo = '',
  obj = {};
export { foo, obj };
// export { foo: '', obj: {}}// export {}不是字面量对象，所以要写成上面这样

export default { a: 1, b: 2 }; // 原理上等于
// export const default = { a: 1, b: 2 };// default是关键字，所以不能这样写
