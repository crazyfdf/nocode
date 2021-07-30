import { postApp, postUniAppsConfig } from '@/CMSRequest/api';
import { exec } from 'child_process';

export default async (req, res) => {
  const { data } = req.body;

  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();
  const uctuiConfig = JSON.stringify({});
  const uctId = await postUniAppsConfig({
    uctuiConfig,
    _updateTime: data._updateTime,
    _createTime: data._createTime,
  });
  console.log(uctId);

  data.uctuiConfigId = uctId.id;
  const app = await postApp(data);
  // TODO:设置默认创建路径(user表的默认创建地址)
  data.file = data.file ? data.file : '/';
  const commend = `cd /D ${data.file} && uct created ${data.name}`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${data.name}项目创建成功`);
    }
  });
  res.status(201).json(app);
};
