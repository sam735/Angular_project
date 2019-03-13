define(['app','loginService'],function(app,loginService){

	app.controller('logOutController',['$scope','$state','$cookies','loginService',function($scope,$state,$cookies,loginService){

		var ctrl = this;
		ctrl.backToLogin = function(){
			$state.go('header.login');
			
		};
	}])
})