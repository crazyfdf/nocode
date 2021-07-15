// 防抖
export const debounce = (time = 500, isImmediate = false) => {
  let timer: any = null;
  let flag = true;
  /* 立即执行版 */
  if (isImmediate) {
    return (target, name, descriptor) => {
      let func = descriptor.value;
      if (typeof func === 'function') {
        descriptor.value = function (...args) {
          if (timer) clearTimeout(timer);
          if (flag) {
            func.apply(this, args);
            flag = false;
          }
          timer = setTimeout(() => {
            flag = true;
          }, time);
        };
      }
    };
  }
  /* 非立即执行版 */
  return (target, name, descriptor) => {
    let func = descriptor.value;
    if (typeof func === 'function') {
      descriptor.value = function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, time);
      };
    }
  };
};

// 节流
export const throttle = (time = 500, isImmediate = false) => {
  let prev = new Date();
  let flag = true;
  if (isImmediate) {
    return (target, name, descriptor) => {
      const func = descriptor.value;
      if (typeof func === 'function') {
        descriptor.value = function (...args) {
          const now = new Date();
          if (Number(now) - Number(prev) > time) {
            if (flag) {
              func.apply(this, args);
              flag = false;
            }
            prev = new Date();
            flag = true;
          }
        };
      }
    };
  }
  return (target, name, descriptor) => {
    const func = descriptor.value;
    if (typeof func === 'function') {
      flag = false;
      descriptor.value = function (...args) {
        const now = new Date();
        if (Number(now) - Number(prev) > time) {
          if (flag) {
            func.apply(this, args);
            flag = false;
          }
          prev = new Date();
          flag = true;
        }
      };
    }
  };
};
// 1、定义附加的功能(无参数)
const log = (target, name, descriptor) => {
  const oldValue = descriptor.value;
  descriptor.value = function (...args) {
    console.log('方法执行前执行的操作~');
    oldValue.apply(target, args);
    console.log('方法执行后执行的操作~');
  };
  return descriptor;
};

// 1、定义附加的功能(有参数)
const log1 = str => {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
      // 这里不能用剪头函数，否则this指向错误
      console.log(`处理传进来的参数：${str}`);
      console.log('方法执行前执行的操作~');
      oldValue.apply(target, args);
      console.log('方法执行后执行的操作~');
    };
    return descriptor;
  };
};

const time = (target, name, descriptor) => {
  const func = descriptor.value;
  if (typeof func === 'function') {
    descriptor.value = function (...args) {
      console.time();
      const results = func.apply(this, args);
      console.timeEnd();
      return results;
    };
  }
};

const before = (...args) => {
  return (target, key, descriptor) => {
    descriptor.value = descriptor.value.before(() => console.log(...args));
  };
};

const after = (...args) => {
  return (target, key, descriptor) => {
    descriptor.value = descriptor.value.after(() => console.log(...args));
  };
};

const around = (...args) => {
  return (target, key, descriptor) => {
    descriptor.value = descriptor.value.around(
      () => console.log(...args),
      () => console.log(...args),
    );
  };
};
