const { patchUniAppsConfig } = require('@/CMSRequest/api');

const fs = require('fs');

export default async (req, res) => {
  let { id, file, uctuiConfig } = req.body.data;

  if (fs.existsSync(`${file}/src`)) {
    file = `${file}/src`;
  }
  fs.writeFileSync(`${file}/common/config.json`, JSON.stringify(uctuiConfig, null, 2), {
    flag: 'w+',
    encoding: 'utf-8',
  });
  const appsConfig = await patchUniAppsConfig(id, { uctuiConfig });

  res.status(201).json(appsConfig);
};
