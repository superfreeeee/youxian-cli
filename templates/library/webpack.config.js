const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src/index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [new WebpackBar(), new CleanWebpackPlugin()],
};
