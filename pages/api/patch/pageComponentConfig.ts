const { patchPageComponentsConfig } = require('@/CMSRequest/api');
const fs = require('fs');

export default async (req, res) => {
  const { pageId, file, path, config } = req.body.data;

  const _file = fs.existsSync(`${file}/src`) ? `${file}/src/${path}` : `${file}/${path}`;
  patchPageComponentsConfig(pageId, { config });
  fs.writeFile(`${_file}.json`, JSON.stringify(config, null, 2), err => {
    err && console.log(err);
  });

  res.status(201).json({});
};
