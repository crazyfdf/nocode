const { patchComponent } = require('@/CMSRequest/api');
// const fs = require('fs');

export default async (req, res) => {
  const { component, config } = req.body.data;
  // fs.writeFile(
  //   `public/component/${component.title}.json`,
  //   JSON.stringify(config, null, 2),
  //   {
  //     flag: 'w+',
  //     encoding: 'utf-8',
  //   },
  //   err => {
  //     err && console.log(err);
  //   },
  // );
  await patchComponent(component._id, { config });
  res.status(201).json({});
};
