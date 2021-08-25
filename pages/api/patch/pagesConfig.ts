const { patchPagesConfig } = require('@/CMSRequest/api');

const fs = require('fs');

export default async (req, res) => {
  let { id, file, name, type, style } = req.body.data;
  if (fs.existsSync(`${file}/src`)) {
    file = `${file}/src`;
  }
  // 1 读取pages.json文件
  fs.readFile(`${file}/pages.json`, 'utf-8', (err, data) => {
    if (err) return;
    // 2 转为js对象
    const res = JSON.parse(data);
    for (let i = 0; i < res.subPackages.length; i++) {
      // 3 找到对应的修改位置
      if (res.subPackages[i].root === `pages/${type}`) {
        for (let j = 0; j < res.subPackages[i].pages.length; j++) {
          if (res.subPackages[i].pages[j].name === name) {
            // 4 修改style
            res.subPackages[i].pages[j].style = style;
            break;
          }
        }
        break;
      }
    }
    // 5 写入pages.json
    fs.writeFile(
      `${file}/pages.json`,
      JSON.stringify(res, null, 2),
      {
        flag: 'w+',
        encoding: 'utf-8',
      },
      err => {
        console.log(err);
      },
    );
  });
  const pagesConfig = await patchPagesConfig(id, style);
  console.log(pagesConfig);
  res.status(201).json(pagesConfig);
};
