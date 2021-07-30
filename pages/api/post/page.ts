import { postPage, postUniPagesConfig, patchApp } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body;
  const { page, app } = data;
  page.path = `pages/${page.type}/${page.name}`;
  page._updateTime = new Date().getTime();
  page._createTime = new Date().getTime();
  const style = JSON.stringify({
    navigationBarTitleText: page.title,
  });

  const pageConfig = await postUniPagesConfig({
    path: page.path,
    style,
    _updateTime: page._updateTime,
    _createTime: page._createTime,
  });
  const pageRes = await postPage({ ...page, uniPagesConfigId: pageConfig.id });
  const pageId = [pageRes.id, ...app.pageId.map(item => item._id)];
  patchApp(app._id, { pageId });
  res.status(201).json(page);
};
