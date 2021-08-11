const { exec } = require('child_process');
const { deleteApp, deleteUniAppsConfig } = require('@/CMSRequest/api');

export default async function (req, res) {
  const { data: app } = req.body;
  const commend = `cd /D ${app.file}&& cd ../ && uct remove ${app.name} app`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${app.name}已删除`);
    }
  });

  const response = (
    await Promise.all([deleteApp(app._id), deleteUniAppsConfig(app.uctuiConfigId._id)])
  )[0];

  res.status(200).json(response);
}
