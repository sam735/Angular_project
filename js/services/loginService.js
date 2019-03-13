define(['app','appConfig','ngCookies'],function(app,appConfig,ngCookies){
	app.provider('loginService',function(){

		this.$get = function($http,appConfig,$cookies){
			var loginService ={};
			var baseUrl = appConfig.baseUrl;

			loginService.getToken = function(userCredential){
				var requestPaylod = "username=" + userCredential.userName 
									+ "&password=" + userCredential.userPass
									+ "&grant_type=password";
				var config = {
	                headers : {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                }
            	};

            	var url = baseUrl + '/token';
				return $http.post( url,requestPaylod, config);

			};
			loginService.setDefaultHeader = function(){
				var access_token = $cookies.getObject('validationInformatin').access_token;
				$http.defaults.headers.get = { 'Content-Type' : 'application/json' }
				$http.defaults.headers.common.Authorization= 'bearer '+ access_token; 				
				loginService.hidelogoutbutton = true;
			}

			return loginService;
		};
	});
});