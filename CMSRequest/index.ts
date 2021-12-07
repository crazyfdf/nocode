import api from '@/packages/uct-request';

const request = api.create({
  baseURL: process.env.baasBaseURL,
});

export default (() => {
  if (request) {
    return request;
  }
  throw new Error('请先创建request实例');
})();
