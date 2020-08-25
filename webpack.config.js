const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.s?css/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpe?g|gif)$/i, use: ['file-loader'] },
      { test: /\.svg$/i, use: ['raw-loader'] },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
