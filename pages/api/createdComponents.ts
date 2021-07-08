// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require('child_process');

export default function (req, res) {
  const { values } = req.body;
  const { name, file, describe, title } = values;
  const yeoman = `cd /D ${file} && yo docs name:${name} describe:${describe}`;
  exec(yeoman, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(yeoman);
    }
  });
  const plop = `cd /D ${process.env.dirname}/generator-docs && yarn plop component ${name} ${title} ${file}/`;

  exec(plop, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(plop);
    }
  });

  res.status(200).json({ msg: 'success' });
}
