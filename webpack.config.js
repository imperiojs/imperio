const webpack = require('webpack');

const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = [
  {
    devtool: 'source-map', // or use source-map-eval
    entry: `${__dirname}/lib/client/mainClient.js`,
    output: {
      path: `${__dirname}/dist`,
      filename: PROD ? 'imperio.min.js' : 'imperio.js',
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
    plugins: PROD ? [
      new webpack.BannerPlugin('Copyright Imperiojs'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
    ] : [
      new webpack.BannerPlugin('Copyright Imperiojs'),
      new webpack.optimize.OccurenceOrderPlugin(),
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
