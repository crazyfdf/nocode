import api from '@/CMSRequest/index';
import { CMSPostResult, CMSDeleteResult } from '@/types/cmsType';

module.exports = {
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

  // 删除app配置
  deleteUniAppsConfig: (id): Promise<CMSDeleteResult> => api.delete(`/uniAppsConfig/${id}`),

  // 新建页面
  postPage: (data): Promise<CMSPostResult> => api.post('/page', { data }),

  // 获取页面
  getPage: data => api.get('/page', { data }),

  // 删除页面
  deletePage: (id): Promise<CMSDeleteResult> => api.delete(`/page/${id}`),

  // 新建页面配置
  postUniPagesConfig: (data): Promise<CMSPostResult> => api.post('/uniPagesConfig', { data }),

  // 获取页面配置
  getUniPagesConfig: data => api.get('/uniPagesConfig/', { data }),

  // 修改页面配置
  patchUniPagesConfig: (id, data) => api.patch(`/uniPagesConfig/${id}`, { data }),

  // 删除页面配置
  deleteUniPagesConfig: (id): Promise<CMSDeleteResult> => api.delete(`/uniPagesConfig/${id}`),

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
};
