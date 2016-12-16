var webpackCfg = require('./webpack.config');
var isCI = process.env.CI;

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {

  var configs = {
    basePath: '',
    browsers: [ 'Chrome' ],
    files: [
      'test/loadtests.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'lcov' }
      ]
    }
  };
  if (isCI) {
    configs.browsers = ['PhantomJS'];
    configs.files.push('./node_modules/phantomjs-polyfill/bind-polyfill.js');
  }
  config.set(configs);
};
