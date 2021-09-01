const { patchPage } = require('@/CMSRequest/api');
const fs = require('fs');

export default async (req, res) => {
  let { pageId, file, path, config, key } = req.body.data;

  const _file = fs.existsSync(`${file}/src`) ? `${file}/src/${path}` : `${file}/${path}`;
  if (!Object.keys(config).length) {
    await patchPage(pageId, { $set: { pageComponents: {} } });
  } else {
    await patchPage(pageId, { pageComponents: config });
  }
  fs.writeFile(`${_file}.json`, JSON.stringify(config, null, 2), err => {
    err && console.log(err);
  });
  const vue = fs.readFileSync(`${_file}.vue`).toString('utf-8');
  const reg1 = new RegExp(`${key}([\\s\\S]*)`, 'ig');
  const reg2 = new RegExp(`${key.replace(/\d+/g, '')}\\>`, 'ig');
  const reg3 = new RegExp('\\/>', 'ig');

  const a: any = reg1.exec(vue);
  let start = a.index;
  while (start--) {
    if (vue[start] === '<') {
      break;
    }
  }
  let c: any = reg2.exec(vue.substring(start));
  let end = c && start + c.index + key.length + 1;
  if (!c) {
    c = reg3.exec(vue.substring(start));
    end = start + c.index + 2;
  }
  const result = vue.substring(0, start) + vue.substring(end);
  fs.writeFile(`${_file}.vue`, result, err => {
    err && console.log(err);
  });

  res.status(201).json({});
};
