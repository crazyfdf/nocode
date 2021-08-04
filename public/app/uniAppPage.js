export default [
  {
    id: 'navigationBarBackgroundColor',
    value: '#000000',
    type: 'Color',
    label: '导航栏背景颜色（同状态栏背景色），如"#000000"',
  },
  {
    id: 'navigationBarTextStyle',
    value: 'white',
    type: 'Radio',
    label: '导航栏标题颜色及状态栏前景颜色，仅支持 black/white',
    range: [
      { key: '白', text: 'white' },
      { key: '黑', text: 'black' },
    ],
  },
  {
    id: 'navigationBarTitleText',
    value: '',
    type: 'Text',
    label: '导航栏标题文字内容',
  },
  {
    id: 'navigationBarShadow',
    value: {},
    type: 'Object',
    label:
      '导航栏阴影，配置参考下方 导航栏阴影	colorType	String	阴影的颜色，支持：grey、blue、green、orange、red、yellow',
  },
  {
    id: 'navigationStyle',
    value: 'default',
    type: 'Radio',
    range: [
      { key: 'default', text: '默认' },
      { key: 'custom', text: '自定义' },
    ],
    label:
      '导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看使用注意	微信小程序 7.0+、百度小程序、H5、App（2.0.3+）',
  },
  {
    id: 'disableScroll',
    value: false,
    type: 'Switch',
    label:
      '设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效	微信小程序（iOS）、百度小程序（iOS）',
  },
  {
    id: 'backgroundColor',
    value: '#ffffff',
    type: 'Color',
    label: '窗口的背景色	微信小程序、百度小程序、字节跳动小程序',
  },
  {
    id: 'backgroundTextStyle',
    value: 'dark',
    type: 'Text',
    label: '下拉 loading 的样式，仅支持 dark/light',
  },
  {
    id: 'enablePullDownRefresh',
    value: false,
    type: 'Switch',
    label: '是否开启下拉刷新，详见页面生命周期。',
  },
  {
    id: 'onReachBottomDistance',
    value: 50,
    type: 'Number',
    label: '页面上拉触底事件触发时距页面底部距离，单位只支持px，详见页面生命周期',
  },
];
