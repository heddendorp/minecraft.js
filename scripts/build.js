/**
 * Created by l.heddendorp on 19.03.2016.
 */
var rimraf = require('rimraf')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var packager = require('electron-packager')
var path = require('path')
var autoprefixer = require('autoprefixer')

var ENV = process.env.npm_lifecycle_event
var isTest = ENV === 'test' || ENV === 'test-watch'
var isBuild = ENV === 'build'

var context = path.resolve(__dirname, '..')
if (isBuild) {
  console.log('Clearing dist')
  rimraf(path.resolve(context, 'dist'), bundle)
  rimraf(path.resolve(context, 'build'), function () {})
} else {
  bundle()
}

function bundle () {
  var config = makeWebpackConfig()
  if (!isBuild) {
    config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  }
  var compiler = webpack(config, function (err, stats) {
    if (err) {
      return console.error(err)
    }
    var jsonStats = stats.toJson()
    if (jsonStats.errors.length > 0) {
      return console.warn(jsonStats.errors)
    }
    if (jsonStats.warnings.length > 0) {
      console.info(jsonStats.warnings)
    }
    if (isBuild) {
      build()
    }
  })
  if (!isBuild) {
    var server = new WebpackDevServer(compiler, {
      // webpack-dev-server options

      contentBase: path.resolve(context, 'dist'),

      // Set this as true if you want to access dev server from arbitrary url.
      // This is handy if you are using a html5 router.
      historyApiFallback: true,
      // webpack-dev-middleware options
      stats: { colors: true }
    })
    server.listen(8080, 'localhost', function () {})
  }
}

function build () {
  console.log('building')
  var opts = {
    arch: 'x64',
    platform: ['win32', 'linux'],
    asar: true,
    dir: path.resolve(context, 'dist'),
    out: path.resolve(context, 'build')
  }
  packager(opts, function done (err, appPath) {
    if (err) {
      console.error(err)
    }
    console.log(appPath)
  })
}

function makeWebpackConfig () {
  var config = {}
  config.context = context
  config.entry = { app: [path.resolve(context, 'src/app/app.js')] }
  config.output = {
    path: path.resolve(context, 'dist'),
    publicPath: isBuild ? './' : 'http://localhost:8080/',
    filename: isBuild ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }
  config.devtool = 'cheap-module-eval-source-map'
  config.module = {
    preLoaders: [],
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel?presets[]=es2015', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass') },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'json' }
    ]
  }
  config.postcss = [
    autoprefixer({ browsers: ['last 2 version'] })
  ]
  config.plugins = []
  config.plugins.push(
    new HtmlWebpackPlugin({ template: path.resolve(context, 'src/public/index.html'), inject: 'body' }),
    new ExtractTextPlugin('[name].[hash].css'),
    new CopyWebpackPlugin([
      { from: path.resolve(context, 'package.json') },
      { from: path.resolve(context, 'src/main.js') },
      { from: path.resolve(context, 'src/img') }
    ])
  )
  // Keep webpack from searching for node core modules
  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
  // config.devServer = { contentBase: './src/public', stats: 'minimal' }
  console.info(config)
  return config
}
