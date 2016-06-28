module.exports = {
  devtool: 'eval-source-map', // or use source-map
  entry: `${__dirname}/client/mobile.js`,
  output: {
    path: `${__dirname}/client/`,
    filename: 'mobileBundle.js',
  },
  // IF WE WANT TO USE THE WEBPACK SERVER - NOT USING FOR NOW SINCE WE HAVE OUR OWN SERVER.
  // devServer: {
  // contentBase: "./public",
  //   colors: true,
  //   historyApiFallback: true,
  //   inline: true,
  // },
};
