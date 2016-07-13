const webpack = require('webpack');

module.exports = [
  {
    entry: `${__dirname}/js/main.js`,
    output: {
      path: `${__dirname}/js`,
      filename: 'bundle.min.js',
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
    plugins:  [
      new webpack.BannerPlugin('Copyright Imperiojs'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
    ],
  },
];
