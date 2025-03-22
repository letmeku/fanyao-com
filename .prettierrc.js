module.exports = {
  pluginSearchDirs: false,
  rules: [
    {
      test: /\.less$/,
      use: [
        "style-loader", // 将样式注入到 DOM 中
        "css-loader",   // 处理 CSS 文件
        "less-loader"   // 处理 LESS 文件
      ]
    }
  ],
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 80,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
