define(['app','logSearchService','appService'],function(app,logSearchService, appService){
    app.controller('dashboardController',['$scope','$state','$cookies','logSearchService','appService', function($scope,$state,$cookies,logSearchService, appService){

        var ctrl = this;

        //define on load function
        var loadDashborad = function() {
            logSearchService.snapshot().then(function(response){
                ctrl.model = response.data;
                appService.cancel();
            })
        }

        appService.showProgress();

        //call on load for loading data
        loadDashborad();

    }]);
});