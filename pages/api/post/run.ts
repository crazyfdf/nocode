const { exec } = require('child_process');

export default (req, res) => {
  const { data } = req.body;
  const { path, type } = data;
  const commend = `cd /D ${path} && uct run ${type}`;
  exec('uct close 8080');
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log('项目已启动');
    }
  });
  return res.status(200).json({ data: '项目启动于3306端口' });
};
