const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/client/mobile.js`,
  output: {
    path: `${__dirname}/client/`,
    filename: 'mobileBundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin('Copyright MA\'AM inc.'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
