"use strict";

var path = require('path');

var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.s?css/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: ['file-loader']
    }, {
      test: /\.svg$/i,
      use: ['file-loader']
    }]
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};