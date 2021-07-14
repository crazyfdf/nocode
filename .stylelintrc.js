module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: {
    'declaration-block-semicolon-newline-after': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  ignoreFiles: [
    'uni-components/**/*',
    'node_modules/**/*',
    'dist/**/*',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    'styles/globals.css',
  ],
};
