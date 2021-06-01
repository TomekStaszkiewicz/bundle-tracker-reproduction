const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const _ = require('underscore');

const RelativeBundleTracker = function (options) {
    BundleTracker.call(this, options);
  };
  RelativeBundleTracker.prototype = Object.create(BundleTracker.prototype);
  RelativeBundleTracker.prototype.writeOutput = function (compiler, contents) {
    const relativePathRoot = path.join(process.cwd(), 'dist', path.sep);
  
    _.forEach(contents.chunks, (bundle) => {
      _.forEach(bundle, (chunk) => {
        if (chunk.path.startsWith(relativePathRoot)) {
          chunk.path = chunk.path.substr(relativePathRoot.length);
        }
      });
    });
    // contents.relativePathRoot = relativePathRoot;
    BundleTracker.prototype.writeOutput.call(this, compiler, contents);
  };

const bundleTracker = new RelativeBundleTracker({
  filename: './bundle-stats.json',
});

const checkBrowserConfig = {
  entry: {
    entryA: path.join(process.cwd(), 'src/a.js'),
    entryB: path.join(process.cwd(), 'src/b.js')
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    bundleTracker
  ]
};

const mainConfiguration = {
   entry: {
    main: path.join(process.cwd(), 'src/main.js'),
    notifications: path.join(process.cwd(), 'src/notifications.js')
  },

  output: {
    filename: '[name].[chunkhash].js',
      chunkFilename: '[name].v223.[chunkhash].chunk.js'
  },

  plugins: [
    bundleTracker,
  ],
};

module.exports = [
    mainConfiguration,
  checkBrowserConfig,
];
