define(['app','appsController', 'settingsController','logOutController','loginController','logSearchController','appDetailsController', 'logTraceController','dashboardController'],
												function(app,logOutController,loginController,logSearchController,
															appsController,settingsController, appDetailsController, logTraceController,dashboardController){
			app.config(['$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {

					$urlRouterProvider.otherwise('/Login');

					$stateProvider
						.state('header',{
							url:'',
							templateUrl:"partials/header.html",
							controller:"loginController as loginVM",
							deepStateRedirect: { default: { state: 'header.login' } }
						})

						.state('header.logout',{
							url:"Logout",
							templateUrl:"partials/loggedout.html",
							controller:"logOutController as logoutVM"
						})

						.state('header.login',{
							url:"/Login",
							cache: false,
							templateUrl:"partials/login-page.html"
						})

					
						.state('header.Home',{
							url:"/Home",
							cache: false,
							templateUrl:"partials/navigation.html",
							deepStateRedirect: { default: { state: 'header.Home.Dashboard' } }
						})

							.state('header.Home.Dashboard', {
					        	url: "/Dashboard",
					        	cache: false,
								templateUrl: "partials/home.html",
								controller: 'dashboardController as ctrl'
					   		 })

							.state('header.Home.Settings',{
								url: "/Settings",
								cache: false,
					        	templateUrl: "partials/settings.html",
					        	controller:'settingsController as settingsVM'
							})

							.state('header.Home.Monitoring',{
								url:"/Monitoring",
								cache: false,
								templateUrl:"partials/navigateMonitoring.html",
								deepStateRedirect: { default:'header.Home.Monitoring.LogSearch' }
							})

								.state('header.Home.Monitoring.LogSearch',{
									url:"/LogSearch",
									cache:false,
									templateUrl:"partials/adapter_logs.html",
									controller:"logSearchController as logSearchVm"
								})

									.state('header.Home.Monitoring.LogSearch.LogDetails',{
										url:"/LogDetails/:id",
										cache:false,
										templateUrl:"partials/courierDetail.html"
									})

								.state('header.Home.Monitoring.LogTrace',{
									url:"/LogTrace",
									cache:false,
									templateUrl:"partials/logTrace.html",
									controller:"logTraceController as logTraceVm"
								})

							.state('header.Home.Apps', {
						        url: "/Apps",
						        cache: false,
						        templateUrl: "partials/apps.html",
						        controller:'appsController as appsVM'
					    	})

					    		.state('header.Home.Apps.NewApp',{
					    			url:"/NewApp",
					    			cache: false,
					    			templateUrl :"partials/addNewApp.html",
					    		})

					    		.state('header.Home.Apps.CreatePgp',{
					    			url:"/CreatePgp",
					    			templateUrl:"partials/create_pgp_key.html"
					    		})

					    		.state('header.Home.Apps.AppDetails', {
							        url: "/AppDetails/:id",
							        cache: false,
									templateUrl: "partials/appdetails.html",
									controller:'appDetailsController as viewModel',
									params: {
										'id': 'global'
									  }
							    })
							}])
						})
