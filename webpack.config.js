const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const bundleTracker = new BundleTracker({
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
