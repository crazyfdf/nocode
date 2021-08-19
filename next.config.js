const path = require('path');
// const glob=require('glob')
// const PurifyCssPlugin =require('purifycss-webpack')
module.exports = {
  reactStrictMode: false,
  env: {
    dirname: path.resolve(),
    baseURL: 'http://localhost:3000',
    baasBaseURL: 'https://cloudcms.uctoo.com/api/v1.0',
    iconPath: '//at.alicdn.com/t/font_2649131_zy315w4q4p.js',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.(js|jsx|ts|tsx)$/,
    //     loader: 'eslint-loader',
    //     enforce: 'pre', // 编译前检查
    //     exclude: [/node_modules/, /\.next/], // 不检测的文件
    //     // include: [resolve('src')], // 指定检查的目录
    //     options: {
    //       // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
    //       formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
    //     },
    //   });
    // }
    // config.plugins=[
    //   new PurifyCssPlugin ({
    //     paths: glob.sync(path.join(__dirname,'src/**/*.html'))
    //   })
    // ]
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
};
