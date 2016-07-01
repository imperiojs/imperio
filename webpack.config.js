const webpack = require('webpack');

module.exports = [
  {
    devtool: 'source-map', // or use source-map-eval
    entry: `${__dirname}/lib/client/mainClient.js`,
    output: {
      path: `${__dirname}/dist`,
      filename: 'imperio.js',
      // library: 'imperio',
      // libraryTarget: 'umd', // This is exporting as a universal module
      // umdNamedDefine: true,
      // explore externals for things we may not want to include in our bundle
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        //{},
      ],
    },
    plugins: [
      new webpack.BannerPlugin('Copyright Imperiojs'),
      new webpack.optimize.OccurenceOrderPlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
    ],
  // IF WE WANT TO USE THE WEBPACK SERVER - NOT USING FOR NOW SINCE WE HAVE OUR OWN SERVER.
    // devServer: {
    //   contentBase: './library/client/mainClient.js',
    //   colors: true,
    //   historyApiFallback: true,
    //   inline: true,
    //   hot: true,
    // },
  },
];
