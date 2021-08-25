import { exec } from 'child_process';

const {
  postPage,
  postPagesConfig,
  patchApp,
  postPageComponentsConfig,
} = require('@/CMSRequest/api');
const fs = require('fs');

export default async (req, res) => {
  const { data } = req.body;
  let {
    page,
    app,
    style = {
      navigationBarTitleText: page.title,
    },
    config,
  } = data;
  console.log(app);

  const commend = `cd /D ${app.file} && uct-plop createPage ${page.name} ${page.type}`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${page.name}页面创建成功`);
    }
  });
  page.path = `pages/${page.type}/${page.name}/${page.name}`;
  page._updateTime = new Date().getTime();
  page._createTime = new Date().getTime();

  const pageConfig = await postPagesConfig({
    style,
    _updateTime: page._updateTime,
    _createTime: page._createTime,
  });
  config =
    config || JSON.parse(fs.readFileSync(`uct-cli/plop-templates/page/${page.type}.json`, 'utf-8'));
  console.log(config);

  const pageComponent = await postPageComponentsConfig({
    config,
    _updateTime: page._updateTime,
    _createTime: page._createTime,
  });
  const pageRes = await postPage({
    ...page,
    pagesConfigId: pageConfig.id,
    status: 0,
    pageComponentsId: pageComponent.id,
  });

  const pageId = app.pageId ? [pageRes.id, ...app.pageId.map(item => item._id)] : [pageRes.id];
  patchApp(app._id, { pageId });
  res.status(201).json({
    ...page,
    _id: pageRes.id,
    pagesConfigId: {
      _id: pageConfig.id,
      style,
      _createTime: page._createTime,
      _updateTime: page._updateTime,
    },
  });
};
