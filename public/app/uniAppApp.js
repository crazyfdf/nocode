export const uniAppAppConfig = [
  {
    id: 'version',
    value: '0.0.1',
    type: 'Text',
    label: 'noCode版本',
  },
  {
    id: 'env',
    value: {
      development: '',
      production: '',
    },
    children: [
      { id: 'development', type: 'Text', value: '', label: '开发环境Api根路径' },
      { id: 'production', type: 'Text', value: '', label: '生产环境Api根路径' },
    ],
    type: 'Object',
    label: 'Api根路径',
  },
  {
    id: 'zIndex',
    value: {
      toast: 10090,
      noNetwork: 10080,
      popup: 10075,
      mask: 10070,
      navbar: 980,
      topTips: 975,
      sticky: 970,
      indexListSticky: 965,
    },
    children: [
      { id: 'toast', type: 'Number', value: 10090, label: 'toast层级' },
      { id: 'noNetwork', type: 'Number', value: 10080, label: 'noNetwork层级' },
      { id: 'popup', type: 'Number', value: 10075, label: 'popup层级' },
      { id: 'mask', type: 'Number', value: 10070, label: 'mask层级' },
      { id: 'navbar', type: 'Number', value: 980, label: 'navbar层级' },
      { id: 'topTips', type: 'Number', value: 975, label: 'topTips层级' },
      { id: 'sticky', type: 'Number', value: 970, label: 'sticky层级' },
      { id: 'indexListSticky', type: 'Number', value: 965, label: 'indexListSticky层级' },
    ],
    type: 'Object',
    label: '层级',
  },
  {
    id: 'share',
    value: { title: '', path: '', imageUrl: '' },
    children: [
      { id: 'title', type: 'Number', value: '', label: '分享标题' },
      { id: 'path', type: 'Number', value: '', label: '分享路径' },
      { id: 'imageUrl', type: 'Number', value: '', label: '分享图片' },
    ],
    type: 'Object',
    label: '分享',
  },
  {
    id: 'store',
    value: { $storeKey: [] },
    children: [{ id: '$storeKey', type: 'Text', value: [], label: '全局变量' }],
    type: 'Object',
    label: '全局管理',
  },
  {
    id: 'map',
    value: { key: [] },
    children: [{ id: 'key', type: 'Text', value: [], label: '腾讯地图key' }],
    type: 'Object',
    label: '地图配置',
  },
];

export const uniAppAppTheme = [];
