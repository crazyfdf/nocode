module.exports = plop => {
  // 创建组件与md
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        default: 'MyComponent',
      },
      {
        type: 'input',
        name: 'disName',
        default: 'MyComponent',
      },
      {
        type: 'input',
        name: 'file',
        default: '',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `{{file}}components/{{name}}/{{name}}.vue`,
        templateFile: 'plop-templates/component/component.vue.hbs',
      },
      {
        type: 'add',
        path: `{{file}}components/{{name}}/{{name}}.md`,
        templateFile: 'plop-templates/component/component.md.hbs',
      },
    ],
  });
  // 创建配置文件
  plop.setGenerator('config', {
    description: 'create a config',
    prompts: [
      {
        type: 'input',
        name: 'name',
        default: 'MyComponent',
      },
      {
        type: 'input',
        name: 'github',
        default: 'github',
      },
      {
        type: 'input',
        name: 'gitee',
        default: 'gitee',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: `{{file}}docs/.vuepress/config.js`,
        templateFile: 'plop-templates/config/config.js.hbs',
      },
    ],
  });
};
