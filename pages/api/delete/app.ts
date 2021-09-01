const { execSync } = require('child_process');
const { deleteApp, deleteUniAppsConfig } = require('@/CMSRequest/api');

export default async function (req, res) {
  const { data: app } = req.body;
  execSync('uct close 8080');

  const commend = `cd /D ${app.file}&& cd ../ && uct remove ${app.name} app`;
  execSync(commend);

  const response = (
    await Promise.all([deleteApp(app._id), deleteUniAppsConfig(app.uctuiConfigId._id)])
  )[0];

  res.status(200).json(response);
}
