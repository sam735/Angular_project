define(['app','loginService'],function(app,loginService){
	app.run(['$http','$cookies','$timeout','$state',function($http,$cookies,$timeout,$state){
		var setDefaultToken = function(){
			$http.defaults.headers.common.Authorization= 'bearer '+ $cookies.getObject('validationInformatin').access_token;
		}

		var logoutAftrSesnExpr = function(){
			var logedIn = new Date($cookies.get('logedIn'));
			var currentTime = new Date();
			var currentMin = currentTime.getMinutes();
			var currentSec = currentTime.getSeconds();
			var totalCurrentTimeInSec = ((currentMin*60) + (currentSec));

			var logedMin = logedIn.getMinutes();
			var logedSec = logedIn.getSeconds();

			var totalLogedTimeInSec = ((logedMin*60)+(logedSec));

			var elapsedTimeinSec = totalCurrentTimeInSec - totalLogedTimeInSec;

			var expireTimeInSec =  $cookies.getObject('validationInformatin').expires_in - elapsedTimeinSec; 
			$timeout(function() {
				if($cookies.getObject('validationInformatin')){
					window.alert('Your session is expired');
					$cookies.remove('logedIn');
					$cookies.remove('validationInformatin');
					$state.go('header.logout');
				}
				return;
			}, expireTimeInSec*1000); 
		}

		if($cookies.getObject('validationInformatin'))
		{
			setDefaultToken();
			logoutAftrSesnExpr();
		}

	}])
})