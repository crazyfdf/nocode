const { exec } = require('child_process');
const { deleteComponent } = require('@/CMSRequest/api');

export default async function (req, res) {
  const { component } = req.body.data;
  const commend = `cd /D public/component && uct-plop componentConfig ${component.title} remove`;
  exec(commend, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    } else {
      console.log(`${component.name}已删除`);
    }
  });

  const response = await deleteComponent(component._id);

  res.status(200).json(response);
}
