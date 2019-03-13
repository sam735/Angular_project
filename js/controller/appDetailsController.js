define(['app','applicationService','settingsService','appService'],function(app,applicationService,settingsService, appService){
    app.controller('appDetailsController',['$scope','$state','$uibModal','$timeout','$stateParams',
    	'applicationService','settingsService','appService',function($scope,$state,$uibModal,$timeout,$stateParams,applicationService,settingsService,appService) {

            var viewModel = this;

            var appSettings;

            var app;
            
            var dirtySettings = [];

            viewModel.onLoad = function(name) {
                
                applicationService.getAppDetails(name).then(function(response){
                    viewModel.app = response.data;
                    
                    settingsService.getAllSettings().then(function(apiResp){
                        viewModel.appSettings = apiResp.data;
                        dirtySettings = [];
                    });
                });
            }

            viewModel.onSettingsChanged = function (settingsName, qualifier, data) {
                dirtySettings[settingsName+qualifier] = data;      
            };

            viewModel.saveSettings = function (settingsName, qualifier, data) {
                var dirtryData = dirtySettings[settingsName+qualifier];

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

            viewModel.onLoad($stateParams.id);

        }]);
});