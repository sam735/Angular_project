define(['app','settingsService','loginService','appService'],function(app){
        app.controller('settingsController',['$scope','$state','$stateParams','settingsService',
            'loginService','appService',function($scope,$state,$stateParams,settingsService,loginService,appService) {
        
        var ctrl = this;
        $scope.mySchema;
        $scope.myStartVal;
        ctrl.newData;
        ctrl.tabName;
        
        ctrl.settings = []

        ctrl.dirtySettings = [];

        ctrl.loadSettings = function() {
            settingsService.getAllSettings()
            .then(function(response){
                appService.hideProgress();
				for(i=0;i<response.data.length;i++){
                    if(response.data[i].Qualifier == 'Global')
                    ctrl.settings.push(response.data[i]);
                    ctrl.dirtySettings = [];
                }
                ctrl.tabName =ctrl.settings.Name
            },function(error){
                if(error.status == '401'){
                    appService.hideProgress();
                    $state.go('header.login');
                }
            });
            appService.showProgress();
        }
        ctrl.loadSettings();
       
        $scope.onChange = function (data) {     
            ctrl.newData = data;       
        };

        $scope.changeSchema = function () {
            settingsService.saveSettings(ctrl.tabName,ctrl.newData);
        };

        ctrl.onSettingsChanged = function (settingsName, qualifier, data) {
            ctrl.dirtySettings[settingsName+qualifier] = data;      
        };

        ctrl.saveSettings = function (settingsName, qualifier, data) {
            var dirtryData = ctrl.dirtySettings[settingsName+qualifier];

            settingsService.saveSettings(settingsName, qualifier, dirtryData)
                           .then(function(resp){
                               if(resp.data.Status == 'Success') {
                                    appService.showMessage(settingsName+' was successfully saved.');
                               }
                               else {
                                    appService.showMessage('Error saving '+settingsName+'. '+resp.data.Message);
                               }
                           });
        };


        this.channelIndex = $stateParams.channelIndex;     
           
    }]);
});