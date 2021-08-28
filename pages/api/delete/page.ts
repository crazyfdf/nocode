const { exec } = require('child_process');
const {
  deletePage,
  deletePagesConfig,
  deletePageComponentsConfig,
  patchApp,
} = require('@/CMSRequest/api');

export default async function (req, res) {
  const { app, page } = req.body.data;
  const commend = `cd /D ${app.file} && uct remove ${page.name} page`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
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
    await Promise.all([
      deletePage(page._id),
      deletePagesConfig(page.pagesConfigId._id),
      deletePageComponentsConfig(page.pageComponentsId._id),
    ])
  )[0];

  res.status(200).json(response);
}
