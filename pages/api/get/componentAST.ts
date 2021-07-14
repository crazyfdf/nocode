// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ComponentDoc } from 'vue-docgen-api';

const { parse } = require('vue-docgen-api');

export default async function (req, res) {
  const data = req.query;
  const componentAST: ComponentDoc = await parse(data.file);
  res.status(200).json({ msg: 'success', data: componentAST });
}
