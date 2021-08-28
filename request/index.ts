import api from '@/packages/uctoo-request';

const request = api.create({
  baseURL: `${process.env.baseURL}/api`,
});

export default (() => {
  if (request) {
    return request;
  } else {
    throw new Error('请先创建request实例');
  }
})();
