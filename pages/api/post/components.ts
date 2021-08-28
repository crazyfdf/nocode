import { execSync } from 'child_process';
import glob from 'globby';
import { typeAdapter } from '@/components/Renderer/FormRenderAdapter';

const { postComponent, getComponent, getComponentAST } = require('@/request/api');
const { removeComment } = require('@/packages/uct-cli/lib/utils');

export default async (req, res) => {
  let { components } = req.body.data;

  // 1 使用命令安装组件库
  const commend = `cd /D uni-components && npm i ${components.title}`;
  await execSync(commend);
  // 2 读取组件库的所有组件
  const cwd = `uni-components/node_modules/${components.title}/components`;

  const _componentsPromise = glob
    .sync(`${components.name}-*/${components.name}-*.vue`, { cwd })
    .map(async f => {
      const title = f ? f.split('/')[0] : null;
      const name = title ? title.slice(components.name.length + 1) : null;
      const path = `${components.title}/components/${title}/${title}`;
      const { data: componentAST } = await getComponentAST({ file: cwd + '/' + f });

      const config = componentAST.props.map(item => {
        const type = typeAdapter(item.type ? item.type.name : 'string');
        let value = item.defaultValue ? item.defaultValue.value : '';
        if (value && type !== 'CodeData') {
          try {
            value = JSON.parse(removeComment(value));
          } catch (error) {
            console.log(value);
          }
        }
        return {
          id: item.name,
          label: item.description ? item.description : '',
          value,
          type,
        };
      });
      return postComponent({ name, title, path, description: componentAST.description, config });
    });

  // 3 存入数据库并创建配置
  await Promise.all(_componentsPromise);
  const componentsR = await getComponent();
  res.status(201).json(componentsR);
};
