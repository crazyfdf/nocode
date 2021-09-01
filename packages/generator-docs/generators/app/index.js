const Generator = require('yeoman-generator');
require('shelljs/global');

module.exports = class extends Generator {
  writing() {
    const data = {
      name: '',
      dirname: '',
      describe: '',
      github: '',
      gitee: '',
    };
    this._args.forEach(item => {
      data[item.substr(0, item.indexOf(':'))] = item.substr(item.indexOf(':') + 1);
    });

    // 每个文件的相对路径
    const templates = [
      './docs/.vitepress/config.js',
      './docs/.vitepress/fileinit.js',
      './docs/.vuepress/config.js',
      './docs/.vuepress/fileinit.js',
      './docs/components/index.md',
      './docs/index.md',
      'docgen.config.js',
      'global.requires.js',
      'package.json',
      'serverless.yml',
    ];
    templates.forEach(item => {
      this.fs.copyTpl(this.templatePath(item), this.destinationPath(item), data);
    });
  }
};
