const path = require('path');


module.exports = {
  context: __dirname,
  entry: './lib/guntanks.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: 'source-map'
};

// module.exports = {
//   entry: "./lib/game.js",
//   output: {
//   	filename: "./lib/bundle.js"
//   },
//   devtool: 'source-map',
// };