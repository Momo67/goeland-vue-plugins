const webpack = require('webpack');
const path = require('path');
const utils = require('./utils')
const APP_ABSOLUTE_PATH = path.join(__dirname, '../src');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: path.join(APP_ABSOLUTE_PATH, '/components/myliste-plugin.js'),
  output: {
    library: 'MyListe',
    libraryTarget: 'window',
    path: path.resolve(__dirname + '/../dist/'),
    filename: 'my-liste.js',
    chunkFilename: 'my-liste.[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['babel-preset-env']
        }
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(tiff|png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        },{
            loader: 'expose-loader',
            options: '$'
        }]
      }
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
        NODE_ENV: '"testing"',
        UI_ENV: JSON.stringify(process.env.UI_ENV || '')
      }
    })
  ]
}
