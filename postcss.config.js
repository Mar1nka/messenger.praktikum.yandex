const postcssImport = require('postcss-import');

module.exports = {
  sourceMap: true,
  plugins: [
    postcssImport({
      root: __dirname,
      path: ['dev/styles'],
    }),
    require('postcss-nested'),
    require('postcss-import'),
  ]
}