// Karma configuration
// Generated on Thu May 17 2018 14:30:17 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test-main.js',

      {pattern:'node_modules/angular/angular.js', included:false},
      {pattern:'lib/angular-cookies/angular-cookies.js',included:false},
      {pattern:'node_modules/angular-mocks/angular-mocks.js',included:false},
      {pattern:'lib/angular-json-editor/dist/angular-json-editor.js',included:false},
      {pattern:'lib/json-editor/dist/jsoneditor.js',included:false},
      {pattern:'lib/angular-1.5.0/ui-router-styles.js',included:false},
      {pattern:'lib/angular-1.5.0/angular-animate.js',included:false},
      {pattern:'lib/angular-1.5.0/angular-sanitize.js',included:false},
      {pattern:'lib/angular-1.5.0/ui-bootstrap-tpls-2.5.0.js',included:false},
      {pattern:'lib/ui-router-0.2.13/angular-ui-router-0.2.13.js',included:false},
      {pattern:'lib/ui-router-extras/release/ct-ui-router-extras.js',included:false},
      {pattern:'js/app.js',included:false},
      {pattern:'js/appConstant.js',included:false},
      {pattern:'js/appConfig.js',included:false},
      {pattern:'js/controller/*.js',included:false},
      {pattern:'js/services/*.js',included:false},
      {pattern:'test/*.js',included:false}
    ],

    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
            'js/controller/*.js' : ['coverage'],
            'js/services/*.js' : ['coverage']

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage','kjhtml'],

    coverageReporter: {
      type : 'html',
      dir : 'lib/coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO || config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
