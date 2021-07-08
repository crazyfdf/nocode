import api from '@/request/index';

export function createdComponents(data) {
  api.post('/api/createdComponents', data);
}

export default api;
