const webpack = require('webpack');
const path = require('path');
const utils = require('./utils')
const APP_ABSOLUTE_PATH = path.join(__dirname, '../src');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: path.join(APP_ABSOLUTE_PATH, '/components/myselect-plugin.js'),
  output: {
    library: 'MySelect',
    libraryTarget: 'window',
    path: path.resolve(__dirname + '/../dist/'),
    filename: 'my-select.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      },
    ]
  },
  externals: {
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
}
