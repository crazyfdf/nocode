import api from '@/CMSRequest/index';
import { CMSPostResult } from '@/types/cmsType';

// 新建app
export function postApp(data): Promise<CMSPostResult> {
  return api.post('/app', { data });
}
// 获取app
export function getApp(data) {
  if (data.id) {
    return api.get(`/app/${data.id}`);
  } else {
    return api.get('/app', { data });
  }
}

// 修改app
export function patchApp(id, data) {
  return api.patch(`/app/${id}`, { data });
}
// 新建app配置
export function postUniAppsConfig(data): Promise<CMSPostResult> {
  return api.post('/uniAppsConfig', { data });
}
// 修改app配置
export function patchUniAppsConfig(id, data) {
  return api.patch(`/uniAppsConfig/${id}`, { data });
}

// 新建组件库
export function postComponents(data): Promise<CMSPostResult> {
  return api.post('/component', { data });
}
// 新建页面
export function postPage(data): Promise<CMSPostResult> {
  return api.post('/page', { data });
}
// 获取页面
export function getPage(data) {
  return api.get('/page', { data });
}
// 新建页面配置
export function postUniPagesConfig(data): Promise<CMSPostResult> {
  return api.post('/uniPagesConfig', { data });
}
// 获取页面配置
export function getUniPagesConfig(data) {
  return api.get('/uniPagesConfig/');
}
// 修改页面配置
export function patchUniPagesConfig(id, data) {
  return api.patch(`/uniPagesConfig/${id}`, { data });
}
export default api;
