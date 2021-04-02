const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    vendors: 'handlebars',
    main: './dev/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        options: {
          runtime: path.resolve(__dirname, 'dev/helpers/registerHelpers.js'),
        },
      },
      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'pcss'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      // hash: true,
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
