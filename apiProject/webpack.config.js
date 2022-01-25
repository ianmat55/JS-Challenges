const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  plugins: [ new dotenv() ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
      test: /\.(png|jpeg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
      }
    ]
  }
};