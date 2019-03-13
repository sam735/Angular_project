define(['app','loginService','loginController','ngMock','appConfig','appConstant'],function(app,loginService,loginController,ngMock,appConfig,appConstant){

	describe('loginController',function(){
		var httpBackend,loginController,$scope;
		beforeEach(function(){
			module('myApp');

			inject(function(_loginService_,_$controller_,$rootScope,_$state_,$injector,_$timeout_){

				loginService = _loginService_;
				$controller = _$controller_;
				$scope = $rootScope.$new();
				$state = _$state_;
				$timeout = _$timeout_;
				$httpBackend = $injector.get('$httpBackend');

				loginController = $controller('loginController',{$scope:$scope, loginService:loginService, $state:$state});


				authRequestHandler = $httpBackend.when('GET', '/auth.py')
		                            		.respond({userId: 'userX'}, {'A-Token': 'xxx'});

			})
		})

		beforeEach(function(done) {
        	done();
    	});


		it('This should reset user to undefined',function(){
			loginController.reset();
			expect(loginController.loginObj['userName']).toBeUndefined();
			expect(loginController.loginObj['userPass']).toBeUndefined();
		})

		it('it should show alert with message please enter user passward',function(){
			loginController.loginObj['userName'] = 'jiva';
			expect(loginController.chkLogin()).toBeUndefined();
		})

		it('it should not show any alert',function(){
			loginController.loginObj = {
				'userName':'Jiva',
				'userPass':'XYZ'
			};
			expect(loginController.chkLogin()).toBeUndefined();
		})

		it('it should show alert with message please enter user name',function(){
				expect(loginController.chkLogin()).toBeUndefined();
		});

		it('It should test for promise object',function(){
			loginController.loginObj = {
				'userName':'Jiva',
				'userPass':'XYZ'
			};
			$httpBackend.expectPOST('/add-msg.py', 'message content').respond({'status':200, 'statusText':'OK'});
			loginController.chkLogin();
			expect(loginController.promise).toBeDefined();
		});

		it('It should test login status to be ok',function(){
			$httpBackend.expectPOST('/add-msg.py', 'message content').respond({'status':200, 'statusText':'OK'});
			loginController.chkLogin();
			$timeout.flush();
			
			expect(loginController.loginStatus).toBe(true);
			
		});
	});
});