import { ComponentDoc } from 'vue-docgen-api';

const { parse } = require('vue-docgen-api');

export default async function (data) {
  const componentAST: ComponentDoc = await parse(data.file);
  return componentAST;
}
