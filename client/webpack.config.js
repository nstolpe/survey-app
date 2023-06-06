const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => ({
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0',
    port: 3030,
    compress: false,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utility: path.resolve(__dirname, 'src/utility'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/public/index.html'),
    }),
    new webpack.DefinePlugin({
      process: { env: JSON.stringify(env) },
    }),
  ],
});
