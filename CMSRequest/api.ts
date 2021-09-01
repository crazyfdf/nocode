import api from '@/CMSRequest/index';
import { CMSPostResult, CMSDeleteResult } from '@/types/cmsType';

module.exports = {
  // 新建组件
  postComponent: (data): Promise<CMSPostResult> => api.post('/component', { data }),

  // 获取组件
  getComponent: data => {
    if (data.id) {
      return api.get(`/component/${data.id}`);
    } else {
      return api.get('/component', { data });
    }
  },

  // 修改组件
  patchComponent: (id, data) => api.patch(`/component/${id}`, { data }),

  // 删除组件
  deleteComponent: (id): Promise<CMSDeleteResult> => api.delete(`/component/${id}`),

  // 收藏组件
  postCollectionComponent: id => api.patch(`/component/${id}`, { data: { status: 1 } }),

  // 取消收藏组件
  deleteCollectionComponent: id => api.patch(`/component/${id}`, { data: { status: 0 } }),

  // 新建组件库
  postComponents: (data): Promise<CMSPostResult> => api.post('/components', { data }),

  // 获取组件库
  getComponents: data => {
    if (data.id) {
      return api.get(`/components/${data.id}`);
    } else {
      return api.get('/components', { data });
    }
  },

  // 修改组件库
  patchComponents: (id, data) => api.patch(`/components/${id}`, { data }),

  // 删除组件库
  deleteComponents: (id): Promise<CMSDeleteResult> => api.delete(`/components/${id}`),

  // 新建页面
  postPage: (data): Promise<CMSPostResult> => api.post('/page', { data }),

  // 获取页面
  getPage: data => {
    if (data.id) {
      return api.get(`/page/${data.id}`);
    } else {
      return api.get('/page', { data });
    }
  },
  // 修改页面
  patchPage: (id, data) => api.patch(`/page/${id}`, { data }),

  // 删除页面
  deletePage: (id): Promise<CMSDeleteResult> => api.delete(`/page/${id}`),

  // 新建页面配置
  postPagesConfig: (data): Promise<CMSPostResult> => api.post('/pagesConfig', { data }),

  // 修改页面配置
  patchPagesConfig: (id, data) => api.patch(`/pagesConfig/${id}`, { data }),

  // 删除页面配置
  deletePagesConfig: (id): Promise<CMSDeleteResult> => api.delete(`/pagesConfig/${id}`),

  // 收藏页面
  postCollectionPage: id => api.patch(`/page/${id}`, { data: { status: 1 } }),

  // 取消收藏页面
  deleteCollectionPage: id => api.patch(`/page/${id}`, { data: { status: 0 } }),

  // 新建app
  postApp: (data): Promise<CMSPostResult> => api.post('/app', { data }),

  // 获取app
  getApp: data => {
    if (data.id) {
      return api.get(`/app/${data.id}`);
    } else {
      return api.get('/app', { data });
    }
  },

  // 修改app
  patchApp: (id, data) => api.patch(`/app/${id}`, { data }),

  // 删除app
  deleteApp: (id): Promise<CMSDeleteResult> => api.delete(`/app/${id}`),

  // 新建app配置
  postUniAppsConfig: (data): Promise<CMSPostResult> => api.post('/uniAppsConfig', { data }),

  // 修改app配置
  patchUniAppsConfig: (id, data) => api.patch(`/uniAppsConfig/${id}`, { data }),

  // 修改app theme配置
  patchTheme: (id, data) => api.patch(`/app/${id}`, { data }),

  // 删除app配置
  deleteUniAppsConfig: (id): Promise<CMSDeleteResult> => api.delete(`/uniAppsConfig/${id}`),

  // 收藏app
  postCollectionApp: id => api.patch(`/app/${id}`, { data: { status: 1 } }),

  // 取消收藏app
  deleteCollectionApp: id => api.patch(`/app/${id}`, { data: { status: 0 } }),

  // 获取组件模板
  getComponentTemplate: data => api.post('/component/find?', data),

  // 获取页面模板
  getPageTemplate: data => api.post('/page/find?', data),

  // 获取应用模板
  getAppTemplate: data => api.post('/app/find?', data),
};
