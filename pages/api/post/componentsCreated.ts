// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isType } from '@/utils/tool';

const { exec } = require('child_process');

const escape = (data: Object) => {
  let json = {};
  const zy = (item: any) => {
    if (isType(item[1], 'String')) {
      return `'${item[1]}'`;
    }
    if (isType(item[1], 'Object')) {
      let children = {};
      Object.entries(item[1]).forEach(element => {
        children = Object.assign(children, { [`'${element[0]}'`]: zy(element) });
      });
      return children;
    }
    return item[1];
  };
  Object.entries(data).forEach(item => {
    json = Object.assign(json, { [`'${item[0]}'`]: zy(item) });
  });
  console.log(json);

  return JSON.stringify(json);
};
export default function (req, res) {
  const { file, json, title } = req.body;
  const plop = `cd /D ${
    process.env.dirname
  }/generator-docs && yarn plop component ${title} ${escape(json)} ${file}`;

  exec(plop, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(plop);
    }
  });

  res.status(200).json({ msg: 'success' });
}
