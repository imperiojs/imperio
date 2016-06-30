const webpack = require('webpack');

module.exports = [
  {
    name: 'client side output to ./library',
    devtool: 'source-map', // or use source-map-eval
    entry: `${__dirname}/library/client/mainClient.js`,
    output: {
      path: `${__dirname}/client/lib/echoLoJS`,
      filename: 'echoLoJS-library.js',
      // library: 'echoLoJS-library',
      // libraryTarget: 'umd', // This is exporting as a universal module
      // umdNamedDefine: true,
      // explore externals for things we may not want to include in our bundle
    },
    watch: true,
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
      new webpack.BannerPlugin('Copyright MA\'AM inc.'),
      // new webpack.HotModuleReplacementPlugin(),
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
