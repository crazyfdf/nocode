import { postApp, postUniAppsConfig } from '@/CMSRequest/api';
import { exec } from 'child_process';

const uctuiConfig = require('@/public/app/uniAppApp.json');

export default async (req, res) => {
  const { data } = req.body;

  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();
  const uctId = await postUniAppsConfig({
    uctuiConfig,
    _updateTime: data._updateTime,
    _createTime: data._createTime,
  });
  console.log(uctId);

  data.uctuiConfigId = uctId.id;
  // TODO:设置默认创建路径(user表的默认创建地址)
  data.file = data.file ? data.file : '/';
  const commend = `cd /D ${data.file} && uct create ${data.name}`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${data.name}项目创建成功`);
    }
  });
  // 创建完项目后将地址改成项目目录
  data.file = `${data.file}/${data.name}`;
  console.log(data.file);

  const app = await postApp(data);

  res.status(201).json(app);
};
