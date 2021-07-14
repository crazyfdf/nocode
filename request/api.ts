import api from '@/request/index';
import { ComponentDoc } from '@/types/component';

// 获取组件ast文档信息
export function getComponentASTApi(data) {
  return api.get<ComponentDoc>('/api/get/componentAST', { params: data });
}

// 新建组件库
export function postComponentDocsApi(data) {
  return api.post('/api/post/componentDocs', data);
}

// 创建组件库案例
export function postComponentsCreatedApi(data) {
  return api.post('/api/post/componentsCreated', data);
}

export default api;
