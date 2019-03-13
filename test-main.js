var allTestFiles = [];
var TEST_REGEXP = /(Spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  // note we are using base/src to ensure that modules are defined relative to the same path
  // for both main.js and test-main.js requireJS bootstraps
  baseUrl: '/base',
  
  paths: {
    angular:'node_modules/angular/angular',
    ngMock:'node_modules/angular-mocks/angular-mocks',
    uiRouterStyles:'lib/angular-1.5.0/ui-router-styles',
    ngAnimate:'lib/angular-1.5.0/angular-animate',
    ngSanitize:'lib/angular-1.5.0/angular-sanitize',
    uiBootstrap:'lib/angular-1.5.0/ui-bootstrap-tpls-2.5.0',
    uiRouter:'lib/ui-router-0.2.13/angular-ui-router-0.2.13',
    uiRouterExtra:'lib/ui-router-extras/release/ct-ui-router-extras',
    JSONEditor:'lib/json-editor/dist/jsoneditor',
    angularJsonEditor:'lib/angular-json-editor/dist/angular-json-editor',
    ngCookies : "lib/angular-cookies/angular-cookies",
    app:'js/app',
    appConfig:'js/appConfig',
    appConstant:'js/appConstant',
    loginService:'js/services/loginService',
    loginServiceSpec:'test/loginServiceSpec',
    loginController:'js/controller/loginController',
    loginControllerSpec:'test/loginControllerSpec',
    settingsController: "js/controller/SettingsController",
    settingsService : 'js/services/settingsService',
    settingsControllerSpec : "test/settingsControllerSpec"  
  },
 
  deps:['loginServiceSpec','loginControllerSpec','settingsControllerSpec'],

  shim:{
    angular :{
      exports : 'angular'
    },
    ngMock : {
      deps : ['angular'],
      exports : 'ngMock'
    },
    uiRouter:{
      deps : ['angular'],
      exports : 'uiRouter'
    },

    uiBootstrap:{
      deps:['angular'],
      exports:'uiBootstrap'
    },

    ngAnimate:{
      deps:['angular'],
      exports:'ngAnimate'
    },

    ngSanitize:{
      deps:['angular'],
      exports:'ngSanitize'
    },

    uiRouterStyles:{
      deps:['angular'],
      exports:'uiRouterStyles'
    },

    angularJsonEditor:{
      deps : ['angular','JSONEditor'],
      exports : 'angularJsonEditor'
    },

    ngCookies:{
      deps : ['angular'],
      exports : 'ngCookies'
    }
  },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});


require(['app','appConfig','appConstant'],function(app,appConfig,appConstant){
  app.init();
});