/*
 * I just copied this over from another coding challenge I did. Hope that's
 * okay.
 */
var path = require('path')

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

/* A global development switch. When running `npm run build`, the NODE_ENV is
 * set to `production`
 */
var dev = process.env.NODE_ENV !== 'production'

var plugins = []
/* Uglifying and deduplicating takes alot of time, so I only run it before
 * committing.
 */
if (!dev) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
  plugins.push(new webpack.optimize.DedupePlugin())
}

var sourcePath = path.resolve(__dirname, 'src')

module.exports = {
  entry: {
    main: './src'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    loaders: [
      /* All JS modules are run through Babel */
      { test: /\.js$/, include: [ sourcePath ], loader: 'babel?presets[]=es2015&cacheDirectory' },
      /* Pug (or jade) was a pretty obvious choice for me. It's written in
       * JavaScript, performs okay, and has a beautiful and concise syntax.
       */
      { test: /\.pug$/, include: [ sourcePath ], loader: 'jade' },
      { test: /\.json/, include: [ sourcePath ], loader: 'json' },
      {
        test: /\.css$/,
        /* I love PostCSS, another very obvious choice. It's very fast and has
         * the `autoprefixer` plugin. Without which I wouldn't want to be
         * writing CSS.
         */
        loader: (
          dev
            ? 'style!css?-minimize&-url!postcss'
            : 'style!css?minimize&-url!postcss'
        )
      }
    ]
  },

  devtool: dev
    ? '#source-map'
    : '',

  plugins: plugins,
  postcss: function () { return [ autoprefixer ] }
}

