define(['app','logSearchService','appService'],function(app,logSearchService,appService){

	app.controller('logSearchController',['$scope','$state','$cookies','logSearchService','appService',
		'$window','$location','$anchorScroll',function($scope,$state,$cookies,logSearchService,appService,$window,$location,$anchorScroll){
		if(!$cookies.getObject('validationInformatin')){
      		$state.go('header.login');
    	}
		var ctrl = this;
		
		var appWindow = angular.element($window);
		var windowHeight = $window.innerHeight;
		var divHeight = windowHeight -150;
		ctrl.courierDivHeight = divHeight+'px';

		appWindow.bind('resize', function () {
			divHeight = $window.innerHeight -150;
			ctrl.courierDivHeight = divHeight+'px';
			$scope.$apply();
  		});
		ctrl.courier = {
			courierName:null,
			courierType:null,
			fromDate: null,
			toDate:null,
			metaData:[
			{metaData:null,value:null}
						],
			skip:'0'
		};
		 $location.path('/Home/Monitoring/LogSearch');
		ctrl.expandDatePicker = {
			'expandFormDatePicker':false,
			'expandToDatePicker':false
		};

		ctrl.fromHrs = null;
		ctrl.fromMins = null;
		ctrl.toHrs = null;
		ctrl.toMins = null;
		ctrl.disableFromHrs = true;
  		ctrl.disableToHrs = true;
		ctrl.required = true;
		ctrl.showDeleteButton = false;
		var pageNo = 1;
		var lastCourier ={};

		var init = function(){
			var range = appService.init();
    		ctrl.hrsArray = range.hrsRange;
    		ctrl.minsArray = range.minsRange;
  		};

  		init();

  		ctrl.openDetPicker = function(picker){
  			var arr = appService.openDatePicker(picker);
  			ctrl.expandDatePicker.expandToDatePicker = arr[0];
  			
  			ctrl.expandDatePicker.expandFormDatePicker = arr[1];
  		}
  		ctrl.getCourier = function(){
  			setDateTime();
  			goToTop();
			ctrl.logs = logSearchService.getCourier(ctrl.courier,false);
			lastCourier.courierName = ctrl.courier.courierName;
			lastCourier.courierType = ctrl.courier.courierType;
			lastCourier.fromDate = ctrl.courier.fromDate;
			lastCourier.toDate = ctrl.courier.toDate;
			lastCourier.metaData = ctrl.courier.metaData;
			reSetDate();
			pageNo = 1;
			ctrl.courierDetails = null;
			$state.go('header.Home.Monitoring.LogSearch');
		};

		var goToTop = function(){
			$location.hash('courierDiv0');
			$anchorScroll();
			$location.hash('');
		}
  		
  		var setDateTime = function(){
  			var date = appService.setDateTime(ctrl.courier.fromDate,ctrl.courier.toDate,ctrl.fromHrs,
  												ctrl.fromMins,ctrl.toHrs,ctrl.toMins);
  			ctrl.courier.fromDate =date.fromDate;
			ctrl.courier.toDate = date.toDate;
  		}

  		ctrl.nextPage = function(){
  			pageNo++;
  			lastCourier.skip = (pageNo-1)*10;
  			if(lastCourier.skip >= parseInt(ctrl.logs.courierCount)){
  				ctrl.noMoreCourier = true;
  				return;
  			}
  			ctrl.logs = logSearchService.getCourier(lastCourier,true);
  		}

  		var reSetDate = function(){
  			ctrl.fromHrs = null;
  			ctrl.fromMins = null;
			ctrl.toHrs = null;
			ctrl.toMins = null;
  			ctrl.courier.fromDate = null;
  			ctrl.courier.toDate = null;
  			ctrl.courier.skip = '0';
  		}

  		ctrl.makeActiveFromHrs = function(){
  			if(ctrl.courier.fromDate != null){
  				ctrl.disableFromHrs = false;
  			}

  			if(ctrl.courier.toDate != null){
  				ctrl.disableToHrs = false;
  			}
  		}
		
		var countAdvSearchField = 1;
		ctrl.addField = function(){
			countAdvSearchField++;
			ctrl.courier.metaData.push({
				metaData:null,
				value:null
			});
			ctrl.showDeleteButton = true;
		}
		ctrl.deleteField = function(){
			ctrl.courier.metaData.pop();
			if(ctrl.courier.metaData.length === 1){
				ctrl.showDeleteButton = false;
			}
		}

		ctrl.getCourierDetails = function(courierId){
			// $state.go('header.Home.Monitoring.LogSearch.LogDetails(id:courierId)')
			logSearchService.getCourierDetails(courierId)
			.then(function(resp){
				ctrl.courierDetails = resp;
			})
		}
	}])

})