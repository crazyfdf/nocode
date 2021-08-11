const { exec } = require('child_process');
const { deletePage, deleteUniPagesConfig, patchApp } = require('@/CMSRequest/api');

export default async function (req, res) {
  const { app, page } = req.body.data;
  const commend = `cd /D ${page.file} && uct remove ${page.name} page`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${page.name}已删除`);
    }
  });
  let i = 0;
  let pageId = app.pageId.map((item, index) => {
    if (item._id !== page._id) {
      i = index;
    }
    return item._id;
  });
  pageId = pageId.splice(i, 1);
  patchApp(app._id, { pageId });

  const response = (
    await Promise.all([deletePage(page._id), deleteUniPagesConfig(page.uniPagesConfigId._id)])
  )[0];

  res.status(200).json(response);
}