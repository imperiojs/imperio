const webpack = require('webpack');

module.exports = [
  {
    name: 'client side output to ./client',
    devtool: 'source-map', // or use source-map
    entry: `${__dirname}/client/mobile.js`,
    output: {
      path: `${__dirname}/client/`,
      filename: 'mobileBundle.js',
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
  // contentBase: "./public",
  //   colors: true,
  //   historyApiFallback: true,
  //   inline: true,
  //   hot: true,
  // },
  },
];
