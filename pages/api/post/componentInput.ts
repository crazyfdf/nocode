import { uuid } from '@/utils/tool';
import { exec } from 'child_process';

const { patchPage, getPage } = require('@/CMSRequest/api');
const fs = require('fs');

export default async (req, res) => {
  const { pageId, file, path, name, title, config } = req.body.data;
  const _file = fs.existsSync(`${file}/src`) ? `${file}/src/${path}` : `${file}/${path}`;
  const _config = config.reduce((arr, item) => Object.assign(arr, { [item.id]: item.value }), {});

  let _configName = `${name}${uuid(6, 10)}`;

  const commend = `uct-plop component ${title} ${_configName} ${_file}.vue`;
  console.log(commend);

  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${_configName}组件创建成功`);
    }
  });
  fs.readFile(`${_file}.json`, 'utf-8', async (err, data) => {
    if (err) return;

    const _data = { ...JSON.parse(data), [_configName]: _config };

    await patchPage(pageId, { pageComponents: _data });

    fs.writeFile(`${_file}.json`, JSON.stringify(_data, null, 2), err => {
      err && console.log(err);
    });
  });
  const page = await getPage({ id: pageId });
  res.status(201).json(page);
};
