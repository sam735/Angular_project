define(['app','appService','logTraceService'],function(app,appService,logTraceService){
	app.controller('logTraceController',['$state','$cookies','appService','logTraceService',function($state,$cookies,appService,logTraceService){
		
    if(!$cookies.getObject('validationInformatin')){
      $state.go('header.login');
    }
	var ctrl =this;
	ctrl.expandDatePicker = {
		'expandFromDatePicker':false,
		'expandToDatePicker':false
	};

	ctrl.log = {
		'module':null,
		'msgSrchTrm':null,
		'srcComponent':null,
		'lebels':null,
		'fromDate':null,
		'toDate':null
	}
	ctrl.fromHrs = null;
	ctrl.fromMins = null;
	ctrl.toHrs = null;
	ctrl.toMins = null;
	ctrl.disableFromHrs = true;
	ctrl.disableToHrs = true;
	ctrl.logs = [];
	ctrl.nextPage='0';
	ctrl.message = [];
	ctrl.hideNextBtn = true;

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
	ctrl.makeActiveHrs = function(){
		if(ctrl.log.fromDate != null){
			ctrl.disableFromHrs = false;
		}

		if(ctrl.log.toDate != null){
			ctrl.disableToHrs = false;
		}
	}

	var setDateTime = function(){
	 	var date = appService.setDateTime(ctrl.log.fromDate,ctrl.log.toDate,ctrl.fromHrs,
										ctrl.fromMins,ctrl.toHrs,ctrl.toMins);
	 	ctrl.log.fromDate =date.fromDate;
   		ctrl.log.toDate = date.toDate;
	}
	ctrl.getLogs = function(){
		ctrl.error = false;
		if(ctrl.nextPage == "-1"){
			ctrl.nextPage='0';
		}

		if(ctrl.log.lebels[0] !=ctrl.lastLebel){
			ctrl.nextPage='0';
			ctrl.hideNextBtn = true;
		}
		setDateTime();
	  	logTraceService.getLogs(ctrl.log,ctrl.nextPage)
		.then(function(resp){
			appService.hideProgress();
			var message = resp.data.Logs;
			truncateMessage(message);
			ctrl.nextPage = resp.data.NextPagePosition;
			if(ctrl.nextPage == "-1"){
				ctrl.hideNextBtn = false;
			}
			ctrl.lastLebel = ctrl.log.lebels;
			ctrl.lastLebelLength = ctrl.log.lebels.length;
		},function(error){
			appService.hideProgress();
			ctrl.error = error;
			ctrl.logs=[]
		})
		appService.showProgress();
  	};

	var truncateMessage = function(message){
		ctrl.logs = [];
		ctrl.message = [];
		for(var msg=0 ;msg<message.length;msg++){
			ctrl.message.push(message[msg].Message);
			message[msg].Message = message[msg].Message.substring(0,30);
			message.isShow = false;
			ctrl.logs.push(message[msg]);
		}
	}

	ctrl.showMoreMsg = function(index,show){
		if(show === 'less'){
			ctrl.logs[index].isShow = false;
		}
		else{
			for(var i=0; i<ctrl.logs.length; i++){
				if(ctrl.logs[i].isShow){
					ctrl.logs[i].isShow = false;
				}
			}
			ctrl.logs[index].isShow = !ctrl.logs[index].isShow;
		}
	}
	}])
})