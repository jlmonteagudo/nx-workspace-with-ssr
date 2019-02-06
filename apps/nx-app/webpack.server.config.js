const path = require('path');
const webpack = require('webpack');
const distFolder = path.join(process.cwd(), 'dist');
const appsFolder = path.join(process.cwd(), 'apps');
module.exports = {
  entry: {
    server: path.join(appsFolder, 'nx-app', 'server.ts')
  },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'production',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(distFolder, 'apps', 'nx-app-server'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(distFolder, 'apps', 'nx-app'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(distFolder, 'apps', 'nx-app'),
      {}
    )
  ]
}
