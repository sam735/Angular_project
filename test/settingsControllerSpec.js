define(['app','settingsService','settingsController','ngMock','appConfig','appConstant'],function(app,settingsService,settingsController,ngMock,appConfig,appConstant){

	describe('settingsController',function(){
		var $scope,mockBackend,settingsController,stateParams,$q,$rootScope,$httpBackend;
		beforeEach(function(){
			module('myApp');
			inject(function(_settingsService_,_loginService_,_$controller_,$rootScope,_$state_,$injector,_$timeout_,_$q_,_$httpBackend_){
				$q = _$q_;
				deferred=$q.defer();
				settingsService = _settingsService_;
				loginService = _loginService_;
				$controller = _$controller_;
				$scope = $rootScope.$new();
				$state = _$state_;
				$timeout = _$timeout_;			
				$httpBackend = $injector.get('$httpBackend');
				mockBackend = $httpBackend;
				stateParams = {channelIndex : 3};
 				settingsController = $controller('settingsController',{$scope:$scope,stateParams:stateParams,
 												settingsService:settingsService,loginService : loginService,$state:$state});
 				
 											
			})
		})

		
		/*it('settingsService should return promise and response',function(){
			settingsService.getSettingsSchema()
			expect(settingsController.promise).toBeDefined();
			var data = [{"Name" : "AdapterInfrastructureSettings",Value : 'three',Schema : {}},{"Name" :"AdminConsole"}];
			spyOn(settingsService,'getSettingsSchema').and.returnValue(data);
			settingsController.promise.then(function(data){
				expect(settingsController.datas).toEqual(data[0]);
				expect(settingsController.tabName).toEqual("AdapterInfrastructureSettings");
				expect($scope.myStartVal).toEqual('three');
				expect($scope.mySchema).toEqual('{}');
				
			});
			
		});	*/

		it('settingsService should return promise and response',function(){
			settingsService.getSettingsSchema()
			expect(settingsController.promise).toBeDefined();
			var data = [{"Name" : "AdapterInfrastructureSettings",Value : 'three',Schema : {}},{"Name" :"AdminConsole"}];
			mockBackend.when('GET','http://192.168.15.158:28350/AdminConsoleService/api/settings').respond(data);
			mockBackend.flush();
			settingsController.promise.then(function(data){
				expect(settingsController.datas).toEqual(data[0]);
				expect(settingsController.tabName).toEqual("AdapterInfrastructureSettings");
				expect($scope.myStartVal).toEqual('three');
				expect($scope.mySchema).toEqual('{}');
				expect($scope.error).toBeUndefined();
			});
			
		});		

		it('onChange function',function(){
			var data = [{"Name" : "AdapterInfrastructureSettings"},{"Name" :"AdminConsole"}];
			$scope.onChange(data);
			expect(settingsController.newData).toBe(data);
		});

		it('should call saveSettings service',function(){
			spyOn(settingsService,'saveSettings');
			settingsController.tabName = "AdapterInfrastructureSettings";
			settingsController.newData = {};
			$scope.changeSchema();
			expect(settingsService.saveSettings).toHaveBeenCalled();

		});
		it('Should return success status',function(){
			settingsController.tabName = "AdapterInfrastructureSettings";
			settingsController.newData = {};
			spyOn(settingsService,'saveSettings').and.returnValue({'Status':'success'});
			$scope.changeSchema();
			var resp = settingsService.saveSettings("AdapterInfrastructureSettings",{});
			expect(settingsController.status).toBe(resp);
		});

		it('Should call saveSettings',function(){
			settingsController.tabName = "AdapterInfrastructureSettings";
			settingsController.newData = {
		            "LogSettings": {
		                "FilePath": "C:\\Program Files\\ZeOmega\\Jiva Adapter Framework\\Logs\\AdapterFrameworkLog.log",
		                "LogName": "AdapterFrameworkLog",
		                "ConfiguredLevels": 4
		            },
		            "Databases": [
		                {
		                    "Name": "TrackingDB",
		                       "DBServer": "192.168.15.158",
		                    "DBName": "1Tracking",
		                    "Username": "sa",
		                    "Password": "Zeomega@2016"
		                }
		            ]
        		};
        	$scope.changeSchema();
			mockBackend.whenPOST('http://192.168.15.158:28350/AdminConsoleService/api/settings/'+settingsController.tabName,settingsController.newData)
			.respond({'Status' : 'success'});
			mockBackend.flush();
			//spyOn(settingsService,'saveSettings').and.returnValue({'Status':'success'});
			//var resp = settingsService.saveSettings("AdapterInfrastructureSettings",{});
			expect(settingsController.status).toBe(resp);
		});
	});
});