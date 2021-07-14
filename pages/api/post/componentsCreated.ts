// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isType } from '@/utils/tool';

const { exec } = require('child_process');

const zy = (data: Object) => {
  let json = {};
  Object.entries(data).forEach(item => {
    if (isType(item[1], 'Object') || isType(item[1], 'String')) {
      item[1] = `'${item[1]}'`;
    }
    json = {
      ...json,
      [`'${item[0]}'`]: item[1],
    };
  });
  console.log(json);

  return JSON.stringify(json);
};
export default function (req, res) {
  const { file, json, title } = req.body;
  const plop = `cd /D ${process.env.dirname}/generator-docs && yarn plop component ${title} ${zy(
    json,
  )} ${file}/`;

  exec(plop, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(plop);
    }
  });

  res.status(200).json({ msg: 'success' });
}
