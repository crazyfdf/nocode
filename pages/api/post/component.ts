const { postComponent } = require('@/CMSRequest/api');
// const fs = require('fs');

export default async (req, res) => {
  let { data } = req.body;

  // 1 创建配置文件
  // const commend = `public/component/${data.title}.json`;
  // fs.writeFile(commend, JSON.stringify(data.config, null, 2), err => {
  //   err && console.log(err);
  // });
  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();
  data.status = 0;
  // 2 上传数据库
  const dataRes = await postComponent(data);
  data._id = dataRes.id;

  res.status(201).json(data);
};
