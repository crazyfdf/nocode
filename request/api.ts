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

  // 添加组件库
  postComponents: data => api.post('/post/components', { data }),

  // 新建组件
  postComponent: data => api.post('/post/component', { data }),

  // 获取组件
  getComponent: data => api.get('/get/component', { data }),

  // 修改组件
  patchComponent: data => api.patch('/patch/component', { data }),

  // 删除组件
  deleteComponent: data => api.post('/delete/component', { data }),

  // 获取收藏组件
  getCollectionComponent: () => api.get('/get/collectionComponent'),

  // 收藏组件
  postCollectionComponent: data => api.post('/post/collectionComponent', { data }),

  // 取消收藏组件
  deleteCollectionComponent: data => api.post('/delete/collectionComponent', { data }),

  // 导入组件
  postComponentInput: data => api.post('/post/componentInput', { data }),

  // 新建页面
  postPage: data => api.post('/post/page', { data }),

  // 获取页面
  getPage: data => api.get('/get/page', { data }),

  // 删除页面
  deletePage: data => api.post('/delete/page', { data }),

  // 收藏页面
  postCollectionPage: data => api.post('/post/collectionPage', { data }),

  // 取消收藏页面
  deleteCollectionPage: data => api.post('/delete/collectionPage', { data }),

  // 获取页面配置
  getUniPagesConfig: data => api.get('/get/uniPagesConfig', { data }),

  // 修改页面配置
  patchUniPagesConfig: data => api.patch('/patch/uniPagesConfig', { data }),

  // 导入页面
  postPageInput: data => api.post('/post/pageInput', { data }),

  // 新建app
  postApp: (data): Promise<CMSPostResult> => api.post('/post/app', { data }),

  // 获取app
  getApp: data => api.get('/get/app', { data }),

  // 删除app
  deleteApp: data => api.post('/delete/app', { data }),

  // 修改app配置
  patchUniAppsConfig: data => api.patch('/patch/uniAppsConfig', { data }),

  // 收藏app
  postCollectionApp: data => api.post('/post/collectionApp', { data }),

  // 取消收藏app
  deleteCollectionApp: data => api.post('/delete/collectionApp', { data }),

  // 导入应用
  postAppInput: data => api.post('/post/appInput', { data }),

  // 启动app
  postRun: data => api.post('/post/run', { data }),

  // 获取模板
  getTemplate: data => api.post('/get/template', { data }),
};
