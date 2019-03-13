define(['app','appConfig'],function(app,appConfig){
	app.factory('applicationService',['appConfig','$http',function(appConfig,$http) {

        var baseUrl = appConfig.baseUrl;

        function createNewApp(app){
            return $http.post(baseUrl + '/api/v1.0/apps',app)
        }

        function getAppDetails(id){
            return $http.get(baseUrl + '/api/v1.0/apps/'+id)
        }

        function getAllApps(){
            return $http.get(baseUrl + '/api/v1.0/apps' )
        }

        function createPgp(Appid,AppCredentials){
            return $http.post(baseUrl + '/api/v1.0/apps/'+Appid+'/PGPKeys',AppCredentials);
        }

        function deactivateApp(appId){
            return $http.post(baseUrl + '/api/v1.0/apps/'+ appId +'/deactivate');
        }

        function activateApp(appId){
            return $http.post(baseUrl + '/api/v1.0/apps/'+appId+'/activate');
        }

        return{
            createNewApp : createNewApp,
            getAppDetails : getAppDetails,
            getAllApps : getAllApps,
            createPgp : createPgp,
            deactivateApp: deactivateApp,
            activateApp: activateApp
        }        
    }]);
});