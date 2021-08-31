import { exec, execSync } from 'child_process';

const { postApp, getApp, postUniAppsConfig } = require('@/CMSRequest/api');
const { postPage } = require('@/request/api');
const uctuiConfig = require('@/public/app/uniAppApp.json');
const theme = require('@/public/app/theme.json');

export default async (req, res) => {
  const { data } = req.body;
  const _uctuiConfig = uctuiConfig.reduce(
    (arr, item) => Object.assign(arr, { [item.id]: item.value }),
    {},
  );

  // 创建theme配置
  data.theme = data.theme ? data.theme : theme;
  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();
  const uctId = await postUniAppsConfig({
    uctuiConfig: data.uctuiConfig ? data.uctuiConfig : _uctuiConfig,
    _updateTime: data._updateTime,
    _createTime: data._createTime,
  });

  data.uctuiConfigId = uctId.id;

  // TODO:设置默认创建路径(user表的默认创建地址)
  data.file = data.file ? data.file : 'D://';

  const commend = `cd /D ${data.file} && uct create ${data.name}`;
  execSync(commend);

  // 创建完项目后将地址改成项目目录
  data.file = `${data.file}/${data.name}`;
  data.status = 0;
  const appId = await postApp(data);
  if (data.pageId) {
    // 克隆app，创建克隆的页面
    await Promise.all(
      data.pageId.map(item => {
        delete item._id;
        delete item._createTime;
        delete item._updateTime;
        return postPage({
          page: item,
          app: { _id: appId.id, file: data.file },
        });
      }),
    );
  } else {
    // 防止pageId为null的影响，创建一个页面
    await postPage({
      page: { title: '首页', name: 'index', description: '', type: 'index' },
      app: { _id: appId.id, file: data.file },
    });
  }
  const { data: app } = await getApp({ id: appId.id });
  exec(`cd /D ${data.file}/${data.name} && npm i`);

  res.status(201).json(app);
};
