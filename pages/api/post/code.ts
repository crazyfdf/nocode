const { execSync } = require('child_process');

export default (req, res) => {
  const { file } = req.body.data;
  const commend = `uct code ${file}`;
  execSync(commend);
  return res.status(200).json({ data: '项目已打开' });
};
