import api from '@/request/index';
import { ComponentDoc } from '@/types/component';
import { CMSPostResult } from '@/types/cmsType';

// 获取组件ast文档信息
export function getComponentAST(data) {
  return api.get<ComponentDoc>('/get/componentAST', { data });
}

// 新建组件库
export function postComponentDocs(data) {
  return api.post('/post/componentDocs', { data });
}

// 创建组件库案例
export function postComponentsCreated(data) {
  return api.post('/post/componentsCreated', { data });
}

// 获取收藏组件
export function getCollectionComponents() {
  return api.get('/get/collectionComponents');
}

// 收藏组件
export function postCollectionComponents(data) {
  return api.post('/post/collectionComponents', { data });
}

// 取消收藏组件
export function deleteCollectionComponents(data) {
  return api.post('/delete/collectionComponents', { data });
}

// 新建app
export function postApp(data): Promise<CMSPostResult> {
  return api.post('/post/app', { data });
}

// 获取app
export function getApp(data) {
  return api.get('/get/app', { data });
}

// 新建页面
export function postPage(data) {
  return api.post('/post/page', { data });
}

// 获取页面
export function getPage(data) {
  return api.get('/get/page', { data });
}

// 获取页面配置
export function getUniPagesConfig(data) {
  return api.get('/get/uniPagesConfig', { data });
}

// 获取页面配置
export function postRun(data) {
  return api.post('/post/run', { data });
}

export default api;
