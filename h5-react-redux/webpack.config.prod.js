var path = require('path')
var webpack = require('webpack')
process.env.NODE_ENV ='production'
process.env.HOT = false


module.exports = {
  entry: {
    index: './index',
    vendor: ['react', 'react-dom','react-redux','react-router','react-router-redux','redux','redux-thunk','isomorphic-fetch']
  }
  ,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName = */"vendor", /* filename= */"vendor.bundle.js")

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
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["> 5%", "iOS 7","Android >= 4.0"]}!postcss-loader!less-loader'
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

