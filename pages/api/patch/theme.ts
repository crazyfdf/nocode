const { patchTheme } = require('@/CMSRequest/api');

const fs = require('fs');

export default async (req, res) => {
  let { app, data } = req.body.data;
  let { file, _id } = app;
  if (fs.existsSync(`${file}/src`)) {
    file = `${file}/src`;
  }
  const theme = fs.readFileSync(`${file}/common/scss/uct-theme.scss`);
  const themeString = theme.toString('utf-8');
  const [key, value] = Object.entries(data)[0];

  const themeReg = new RegExp(`${key}:([\\s\\S]*)`, 'ig');

  const a: any = themeReg.exec(themeString);
  const c = a[1].match(/;/);
  const start = a.index + key.length + 1;
  const end = start + c.index;
  const result = themeString.substring(0, start) + value + themeString.substring(end);

  fs.writeFileSync(`${file}/common/scss/uct-theme.scss`, result, {
    flag: 'w+',
    encoding: 'utf-8',
  });
  const config = app.theme.map(v => {
    if (v.id === key) {
      return { ...v, value };
    } else {
      return v;
    }
  });
  const appsConfig = await patchTheme(_id, { theme: config });

  // res.status(201).json(appsConfig);
  res.status(201).json(appsConfig);
};
