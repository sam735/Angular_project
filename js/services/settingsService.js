define(['app','appConfig'],function(app,appConfig){
	app.factory('settingsService',['appConfig','$http',function(appConfig,$http) {

        var baseUrl = appConfig.baseUrl;

        function getAllSettings(){
            return $http.get(baseUrl + '/api/v1.0/settings');
        }


        function getSettingsSchema(){
            return $http.get(baseUrl + '/api/v1.0/settings');
        }

        function saveSettings(settingName,data) {
            return $http.post(baseUrl + '/api/v1.0/settings/'+settingName,data); 
        }

        function saveSettings(settingName, qualifier, data) {
            return $http.post(baseUrl + '/api/v1.0/settings/'+qualifier+'/'+settingName,data); 
        }

        function createNewApp(app){
            return $http.post(baseUrl + '/api/v1.0/apps',app)
        }

        function getAppDetails(id){
            return $http.get(baseUrl + '/api/v1.0/apps/'+id)
        }

        function getAllApps(){
            return $http.get(baseUrl + '/api/v1.0/apps')
        }

        function createPgp(Appid,AppCredentials){
            return $http.post(baseUrl + '/api/v1.0/apps/'+Appid+'/PGPKeys',AppCredentials);
        }

        return{

            getAllSettings : getAllSettings,
            getSettingsSchema : getSettingsSchema,
            saveSettings : saveSettings,
            createNewApp : createNewApp,
            getAppDetails : getAppDetails,
            getAllApps : getAllApps,
            createPgp : createPgp
        }        
    }]);
});