const path = require('path');
const glob = require('globby');
const cwd = path.join(__dirname, '..');
const dest = path.join(__dirname, '../../dist');

const { parse } = require('vue-docgen-api');

const { renameComponentMd } = require('./fileinit.js');
var vitePressConfig = async () => {
  renameComponentMd(cwd + '/components');
  const routerFiles = glob.sync('components/**/*.md', { cwd }).map(f => {
    let text = f.slice(f.lastIndexOf('/') + 1, -3);
    return { text, link: `/${f.slice(0, -2)}html` };
  });
  const components = await Promise.all(
    glob
      .sync('../../components/**/[a-z].{vue,jsx,ts,tsx}', { cwd, absolute: true })
      .map(async path => {
        return {
          name: (await parse(path)).displayName.replace(/[^a-zA-Z0-9_]/g, ''),
          path,
        };
      }),
  );
  //引入fs文件目录模块
  return {
    title: 'Uct UI',
    dest: dest,
    base: '/',
    themeConfig: {
      search: true,
      editLinks: true,
      nav: [
        // 导航栏配置
        { text: 'github', link: '<%= github %>' },
        { text: 'gitee', link: '<%= gitee %>' },
      ],
      sidebar: routerFiles,
      markdown: {
        // 为每个代码块显示行号
        lineNumbers: true,
      },
    },
    plugins: [
      ['live'],
      [
        '@vuepress/register-components',
        '@vuepress/nprogress',
        {
          //热更新时进行检测文件 但是.md文件如何进行更改后就无法进行热更新检测了
          components,
          componentsDir: '../../components',
        },
      ],
    ],
  };
};
module.exports = vitePressConfig();
