define(['angular','uiRouter','uiRouterStyles','uiBootstrap','ngAnimate','ngSanitize','angularJsonEditor','uiRouterExtra','ngCookies'], 
	function () {
  var app = angular.module('myApp', ['ui.router','uiRouterStyles','ui.bootstrap','ngAnimate','ngSanitize','angular-json-editor','ct.ui.router.extras','ngCookies']);

  app.config(function (JSONEditorProvider) {
        JSONEditorProvider.configure({
            plugins: {
                sceditor: {
                    style: 'sce/development/jquery.sceditor.default.css'
                }
            },
            defaults: {
                options: {
                    iconlib: 'bootstrap3',
                    theme: 'bootstrap3',
                    ajax: true,
                    form_name_root : '',
                    disable_properties : true,
                    //disable_collapse : true,
                    disable_edit_json : true
                }
            }
        }); 
 	});
  app.init = function () {
    angular.bootstrap(document,['myApp']);
  };

  	return app;
});



