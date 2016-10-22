// so dogfood
const getEnv = require('../..');
const env = getEnv();

const webpack = require('webpack')
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    noParse: [
      /node_modules(\\|\/)sinon/
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'test')
        ],
        loader: 'babel-loader'
      },
      {
        test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
  },
  plugins: [
    // Note `#getPublicEnv` util
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
      'process.env': env.utils.getPublicEnv([
        'NODE_ENV',
        'CLIENT'
      ])
    })
  ],
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon'
    }
  }
};