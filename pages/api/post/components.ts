import { execSync } from 'child_process';
import glob from 'globby';
import { typeAdapter } from '@/components/Renderer/FormRenderAdapter';
import getComponentAST from '@/request/componentAST';

const { postComponent, postComponents, getComponents } = require('@/CMSRequest/api');
const { removeComment } = require('@/packages/uct-cli/lib/utils');

export default async (req, res) => {
  let { components } = req.body.data;

  // 1 使用命令安装组件库
  const commend = `cd /D uni-components && npm i ${components.title}`;
  await execSync(commend);
  // 2 读取组件库的所有组件
  const cwd = `uni-components/node_modules/${components.title}/components`;
  const _updateTime = new Date().getTime();
  const _createTime = new Date().getTime();
  const status = 0;
  const _componentsPromise = glob
    .sync(`${components.name}-*/${components.name}-*.vue`, { cwd })
    .map(async f => {
      const title = f ? f.split('/')[0] : null;
      const name = title ? title.slice(components.name.length + 1) : null;
      const path = `${components.title}/components/${title}/${title}`;
      const componentAST = await getComponentAST({ file: cwd + '/' + f });
      const config =
        componentAST.props &&
        componentAST.props.map(item => {
          const type = typeAdapter(item.type ? item.type.name : 'string');
          let value = item.defaultValue ? item.defaultValue.value : '';
          try {
            value = removeComment(value);
          } catch (error) {
            console.log(error);
          }
          if (value && type !== 'CodeData') {
            try {
              value = JSON.parse(value);
            } catch (error) {
              try {
                value = JSON.parse(value.replace(/'/gi, '"'));
              } catch (error) {
                console.log(value);
              }
            }
          }
          return {
            id: item.name,
            label: item.description ? item.description : '',
            value,
            type,
          };
        });
      return {
        name,
        title,
        path,
        description: componentAST.description,
        config,
        _updateTime,
        _createTime,
        status,
      };
    });

  // 3 存入数据库并创建配置
  const _components = await Promise.all(_componentsPromise);
  const componentId = await postComponent(_components);
  await postComponents({
    name: components.name,
    title: components.title,
    componentId: componentId.ids,
    _createTime,
    _updateTime,
    status,
  });
  // 4 获取组件库并返回
  const { data: componentsR } = await getComponents({});
  res.status(201).json(componentsR.componentId);
};
