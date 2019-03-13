require.config({
	baseUrl :'',
	paths:{
		angular : "lib/angular-1.5.0/angular",
		require : "lib/requireJs-2.1.15/require",
		uiRouterStyles:"lib/angular-1.5.0/ui-router-styles",
		JSONEditor : "lib/json-editor/dist/jsoneditor",
		angularJsonEditor : "lib/angular-json-editor/dist/angular-json-editor",
		ngAnimate:"lib/angular-1.5.0/angular-animate",
		ngSanitize:"lib/angular-1.5.0/angular-sanitize",
		uiBootstrap:"lib/angular-1.5.0/ui-bootstrap-tpls-2.5.0",
		uiRouter :"lib/ui-router-0.2.13/angular-ui-router-0.2.13",
		uiRouterExtra:"lib/ui-router-extras/release/ct-ui-router-extras.min",
		ngCookies : "lib/angular-cookies/angular-cookies",
		app : "js/app",
		whenScrolled:"js/directive/infiniteScroll",
		setHeader:"js/setHeader",
		appConfig:'js/appConfig',
		appConstant:'js/appConstant',
		route : "js/route",
		loginController:"js/controller/loginController",
		dashboardController:"js/controller/dashboardController",
		appsController:"js/controller/appsController",
		appDetailsController:"js/controller/appDetailsController",
		settingsController: "js/controller/settingsController",
		appService:'js/services/appService',
		loginService:'js/services/loginService',
		settingsService : 'js/services/settingsService',
		applicationService: 'js/services/applicationService',
		logOutController :'js/controller/logOutController',
		logSearchController:'js/controller/logSearchController',
		logSearchService:'js/services/logSearchService',
		logTraceController:'js/controller/logTraceController',
		logTraceService:'js/services/logTraceService'
	},
	shim:{
		angular :{
			exports : 'angular'
		},
		require : {
			exports : 'require'
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
	
});
require(['app','route','appConfig','appConstant','setHeader','whenScrolled'],function(app,route,appConfig,appConstant,setHeader,whenScrolled){
    app.init();
});