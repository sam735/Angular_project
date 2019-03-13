define(['app','loginService','ngMock'],function(app,loginService,ngMock){

	// describe('loginService',function(){


	// 	var $httpBackend,loginService;

	// 	beforeEach(function(){
	// 		module('myApp');
	// 		inject(
	// 			function($injector,_loginService_){
			
	// 				loginService = _loginService_;
	// 				// loginServicePromise = $injector.get('loginServicePromise');
	// 				$httpBackend = $injector.get('$httpBackend');
	// 				authRequestHandler = $httpBackend.when('GET', '/auth.py')
	// 	                            		.respond({userId: 'userX'}, {'A-Token': 'xxx'});

	// 			}
	// 		)
	// 	});

	// 	it('It should return status as ok',function(){
	// 		var loginObj = {
	// 			'userName':'abc',
	// 			'userPass':'xyz'
	// 		};

	// 		$httpBackend.expectPOST('/add-msg.py', 'message content').respond({'status':200, 'statusText':'OK'});

	// 		var promise = loginService.getToken(loginObj);
	// 			promise.then(function(rsp){
	// 				expect(rsp.statusText).toBe('OK');
	// 			});
	// 	});

	// });

});