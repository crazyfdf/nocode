import { postPage, postUniPagesConfig, patchApp } from '@/CMSRequest/api';
import { exec } from 'child_process';

export default async (req, res) => {
  const { data } = req.body;
  const { page, app } = data;
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
  const style = {
    navigationBarTitleText: page.title,
  };

  const pageConfig = await postUniPagesConfig({
    style,
    _updateTime: page._updateTime,
    _createTime: page._createTime,
  });
  const pageRes = await postPage({ ...page, uniPagesConfigId: pageConfig.id });

  const pageId = app.pageId ? [pageRes.id, ...app.pageId.map(item => item._id)] : [pageRes.id];
  patchApp(app._id, { pageId });
  res.status(201).json({
    ...page,
    _id: pageRes.id,
    uniPagesConfigId: {
      _id: pageConfig.id,
      style,
      _createTime: page._createTime,
      _updateTime: page._updateTime,
    },
  });
};
