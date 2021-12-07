import api from '@/packages/uct-request';

const request = api.create({
  baseURL: `${process.env.baseURL}/api`,
});

export default (() => {
  if (request) {
    return request;
  }
  throw new Error('请先创建request实例');
})();
