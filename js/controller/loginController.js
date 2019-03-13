define(['app','loginService','appService'],function(app,loginService,appService){
	app.controller('loginController',['$scope','$state','$timeout','loginService','appService','$http',
							'$cookies',function($scope,$state,$timeout,loginService,appService,$http,$cookies){


		var ctrl = this;
		ctrl.loginStatus = true;
		ctrl.loginObj = {
			'userName':undefined,
			'userPass':undefined
		};
		if($cookies.getObject('validationInformatin')){
			ctrl.hideLogoutButton = true;
		}
		else{
			ctrl.hideLogoutButton = false;
		}
		ctrl.waitForLoginToken = function(){
			$timeout(
				function(){
					ctrl.promise
					.then(function(resp){
						appService.hideProgress();
						ctrl.loginStatus = true;
						ctrl.storeToken(resp.data.access_token,resp.data.expires_in);
						var expiresIn = resp.data.expires_in;
						var today = new Date();
						$cookies.put('logedIn',today);
						logoutAftrSesnExp((resp.data.expires_in * 1000));
						$state.go('header.Home');
						ctrl.hideLogoutButton = true;
						loginService.setDefaultHeader();
					},function(error){
						appService.cancel();
						ctrl.loginStatus = false;
						$state.go('header.login');
					})
				},1000);
			appService.showProgress();
		};

		var logoutAftrSesnExp = function(expiresIn){
			$timeout(function() {
				window.alert('Your session is expired');
				ctrl.logOut();
				$cookies.remove('logedIn');
			}, expiresIn);
			
		}

		ctrl.chkLogin = function(){

			if(ctrl.loginObj['userName'] == undefined){
				window.alert('Please enter user name');
				ctrl.reset();
				return;
			}

			else if(ctrl.loginObj['userPass'] == undefined){
				window.alert('please enter password');
				ctrl.reset();
				return;
			}

			ctrl.promise = loginService.getToken(ctrl.loginObj);
			ctrl.waitForLoginToken();
                
	}

	ctrl.reset = function(){
		ctrl.loginObj['userName'] = undefined;
		ctrl.loginObj['userPass'] = undefined;
	}

	ctrl.logOut = function(){
		$cookies.remove('validationInformatin');
		ctrl.hideLogoutButton = false;
		ctrl.reset();
		$state.go('header.logout');
	}

	ctrl.storeToken = function(accessToken,expiresIn){
		var today = new Date();
    	var expiresValue = new Date(today);
    	var validationInformatin = {
							'userName':ctrl.loginObj.userName,
							'access_token':accessToken,
							'expires_in':expiresIn
						};
		expiresValue.setSeconds(today.getSeconds() + expiresIn);

		$cookies.putObject('validationInformatin', validationInformatin, {'expires' : expiresValue});
	}
	
	}]);
});