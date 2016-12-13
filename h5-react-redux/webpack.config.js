var path = require('path')
var webpack = require('webpack')
var baseurl = '\\/img'
process.env.NODE_ENV ='development'
process.env.HOT = true

module.exports = {
  devtool:'source-map',
  //devtool:'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["> 5%", "iOS 7","Android >= 4.0"]}!postcss-loader!less-loader?{"modifyVars":{"baseurl":"\'' + baseurl +'\'"}}'
      }, 
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'base64-font-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=0'
      }, 
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss: function () {
    return [require('postcss-flexbugs-fixes')()];
  }
}
