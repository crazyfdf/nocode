const fs = require('fs');

export default async (req, res) => {
  const { file, path, name, config } = req.body.data;
  const _file = fs.existsSync(`${file}/src`) ? `${file}/src/${path}` : `${file}/${path}`;
  const _config = config.reduce((arr, item) => Object.assign(arr, { [item.id]: item.value }), {});
  fs.readFile(`${_file}.json`, 'utf-8', (err, data) => {
    if (err) return;
    const _data = { ...JSON.parse(data), [name]: _config };

    fs.writeFile(`${_file}.json`, JSON.stringify(_data, null, 2), err => {
      err && console.log(err);
    });
  });
};
