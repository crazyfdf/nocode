import api from '@/CMSRequest/index';
import { CMSPostResult } from '@/types/cmsType';

// 新建app
export function postApp(data): Promise<CMSPostResult> {
  return api.post('/app', { data });
}
// 获取app
export function getApp(data) {
  return api.get('/app', { data });
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
export function getUniPagesConfig(name) {
  return api.post('/uniPagesConfig/find?name=' + name);
}
export default api;
