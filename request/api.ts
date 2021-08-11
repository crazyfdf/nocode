import api from '@/request/index';
import { ComponentDoc } from '@/types/component';
import { CMSPostResult } from '@/types/cmsType';

module.exports = {
  // 获取组件ast文档信息
  getComponentAST: data => api.get<ComponentDoc>('/get/componentAST', { data }),

  // 新建组件库文档
  postComponentDocs: data => api.post('/post/componentDocs', { data }),

  // 创建组件库案例
  postComponentsCreate: data => api.post('/post/componentsCreate', { data }),

  // 获取收藏组件
  getCollectionComponents: () => api.get('/get/collectionComponents'),

  // 收藏组件
  postCollectionComponents: data => api.post('/post/collectionComponents', { data }),

  // 取消收藏组件
  deleteCollectionComponents: data => api.post('/delete/collectionComponents', { data }),

  // 新建app
  postApp: (data): Promise<CMSPostResult> => api.post('/post/app', { data }),

  // 获取app
  getApp: data => api.get('/get/app', { data }),

  // 删除app
  deleteApp: data => api.post('/delete/app', { data }),

  // 修改app配置
  patchUniAppsConfig: data => api.patch('/patch/uniAppsConfig', { data }),

  // 新建页面
  postPage: data => api.post('/post/page', { data }),

  // 获取页面
  getPage: data => api.get('/get/page', { data }),

  // 删除page
  deletePage: data => api.post('/delete/page', { data }),

  // 获取页面配置
  getUniPagesConfig: data => api.get('/get/uniPagesConfig', { data }),

  // 修改页面配置
  patchUniPagesConfig: data => api.patch('/patch/uniPagesConfig', { data }),

  // 启动项目
  postRun: data => api.post('/post/run', { data }),

  // 新建组件
  postComponent: data => api.post('/post/component', { data }),

  // 获取组件
  getComponent: data => api.get('/get/component', { data }),

  // 修改组件配置
  patchComponent: data => api.patch('/patch/component', { data }),
  // 删除页面
  deleteComponent: data => api.post('/delete/component', { data }),
};
