import { exec } from 'child_process';

const { postComponent } = require('@/CMSRequest/api');

export default async (req, res) => {
  let { component } = req.body.data;

  // 1 使用命令创建配置文件
  const commend = `cd /D public/component/uct && uct-plop componentConfig ${component.name} create`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${component.name}组件创建成功`);
    }
  });
  component.path = `node_modules/uctui/components/uct-${component.name}/uct-${component.name}`;
  component.config = [];
  component._updateTime = new Date().getTime();
  component._createTime = new Date().getTime();
  // 2 上传数据库
  const componentRes = await postComponent(component);
  component._id = componentRes.id;

  res.status(201).json(component);
};
