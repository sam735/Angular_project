define(['app','appService','applicationService','settingsService'],function(app,appService,applicationService,settingsService){
    app.controller('appsController',['$scope','$state','$timeout','$location',
    	'appService','applicationService','settingsService',function($scope,$state,$timeout,$location,appService,applicationService,settingsService) {
    
	    var ctrl = this;
	    ctrl.apps='';
	    ctrl.createPgpDetails = {
	    	UserName: null,
	    	Password: null
	    }
	    
	    ctrl.applicationId = null;
	    ctrl.newAppContainer = {
    		Name: "",
	        DisplayName: "",
	        Description:"",
	        IsActive:true,
		};

		ctrl.localAppCopy = {
			Name: "",
	        DisplayName: "",
	        Description:"",
	        IsActive:true,
	        Id : ''
		};

		ctrl.appDetailsData = '';	

	    ctrl.getAllApps = function(){
	    	applicationService.getAllApps()
	    	.then(function(response){
	    		appService.hideProgress();
				ctrl.apps = response.data;
				
				if($location.path().indexOf("/AppDetails/") === -1){
					var firstApp = ctrl.apps[0];
					$state.go('header.Home.Apps.AppDetails', {id:firstApp.Id});
				}
				
	    	},function(error){
	    		appService.hideProgress();
	    		if(error.status == '401'){
	    			appService.hideProgress();
	    			$state.go('header.login');
	    		}
	    	});
	    	appService.showProgress();
		}

		ctrl.isSelectedApp = function (appId) {
			if($location.path().indexOf("/AppDetails/"+appId) > -1) {
				return true;
			}

			return false;
		}
		
	    ctrl.getAllApps();
	    
	    ctrl.appsDetails = function(){
	    	$state.go('header.Home.Apps.AppDetails');
	    }
	     
	    ctrl.addNewAppRoute = function(){
	    	$state.go('header.Home.Apps.NewApp');
	    }

	    ctrl.DirectToPgpKeyView = function(appId){
	    	$state.go('header.Home.Apps.CreatePgp');
	    	ctrl.applicationId = appId;
	    };

	    ctrl.createPgp = function(){
	    	settingsService.createPgp(ctrl.applicationId,ctrl.createPgpDetails)
	    	.then(function(response){
	    		ctrl.loadSettings();
	    		appService.hideProgress();
	    		appService.openMessageModal('partials/result.html');
	    		$timeout(function() {
	    			appService.cancelMessageModal();
	    		}, 2000);
	    	},function(error){
	    		appService.hideProgress();
	    		ctrl.error = error;
	    	})
	    	appService.showProgress();
	    }
		
	    ctrl.addNewApp = function(){
	    	ctrl.localAppCopy.Name = ctrl.newAppContainer.Name;
	    	ctrl.localAppCopy.DisplayName =ctrl.newAppContainer.DisplayName;
	    	ctrl.localAppCopy.Description =ctrl.newAppContainer.Description;
			ctrl.localAppCopy.IsActive =ctrl.newAppContainer.IsActive;
			
	    	applicationService.createNewApp(ctrl.newAppContainer)	
	    	.then(function(response){
		    		var data = response.data;
		    		ctrl.localAppCopy.Id = data.Values.AppId;
		    		ctrl.getAllApps();
		    	    ctrl.reset();
	    		},function(error){
		    		$scope.error = error.Message;
		    		ctrl.reset();
				}
			);
	    }

	    ctrl.reset = function(){
	    	ctrl.newAppContainer = {
	    		Name: "",
		        DisplayName: "",
		        Description:"",
		        IsActive:true,
		        Id : ''
			};
		}

		ctrl.cancel = function(){
	    	$state.go('header.Home.Apps');
	    }

	    ctrl.getAppDetails = function(app,id){
	    	applicationService.getAppDetails(id)
	    	.then(function(response){
	    		ctrl.appDetailsData = response.data; 		
	    	});
	    };

	    ctrl.loadSettings = function() {
            settingsService.getAllSettings()
            .then(function(response){
                ctrl.settings = response.data;
                ctrl.tabName =ctrl.settings.Name
                $scope.myStartVal = ctrl.settings.Value
                $scope.mySchema = ctrl.settings.Schema
            });
		}
		
        ctrl.loadSettings();
       
        $scope.onChange = function (data) {
            ctrl.newData = data;       
        };

        $scope.changeSchema = function () {
            settingsService.saveSettings(ctrl.tabName,ctrl.newData);
		};
		
		ctrl.toggleActivation = function(appid, currentState) {
			var responseHandler = null;
			if(currentState){
				responseHandler = applicationService.deactivateApp(appid);
			}
			else{
				responseHandler = applicationService.activateApp(appid);
			}

			responseHandler.then(function(resp){
				if(resp.data.Status == 'Success') {
					ctrl.getAllApps();
				}
			});
		}

	}]);
});