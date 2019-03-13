define(['app'],function(app){
	app.provider('appService',function(){

		this.$get = function($filter,$uibModal,$timeout){
			var appService = {};

	    	var hrsRange = [
				'00','01','02','03','04','05',
				'06','07','08','09','10','11',
				'12','13','14','15','16','17',
				'18','19','20','21','22','23'
  			];

  			var minsRange = [
	  			'00','01','02','03','04','05',
				'06','07','08','09','10','11',
				'12','13','14','15','16','17',
				'18','19','20','21','22','23',
				'24','25','26','27','28','29',
				'30','31','32','33','34','35',
				'36','37','38','39','40','41',
				'42','43','44','45','46','47',
				'48','49','50','51','52','53',
				'54','55','56','57','58','59'
  			]

	    	appService.openDatePicker = function(picker){
  				if (picker === 'toDate'){
  					return [true,false];
  				}

  				else if (picker === 'fromDate'){
  					return [false,true];
  				}
	    	};

	    	appService.init = function(){
	    		
	    		return {
	    			'hrsRange':hrsRange,
	    			'minsRange':minsRange
	    		}
  			};

  			appService.setDateTime = function(fromDate,toDate,fromHrs,fromMins,toHrs,toMins){
  				fromDate = $filter('date')(fromDate,'yyyy-MM-dd');
  				toDate = $filter('date')(toDate,'yyyy-MM-dd');
	  			if(fromHrs != null && fromMins !=null){
	  				fromDate = fromDate +' '+ fromHrs + ':' + fromMins;
	  			}

	  			if(fromHrs != null && fromMins ==null){
	  				fromDate = fromDate +' '+ fromHrs + ':00';
	  			}

	  			if(toHrs != null && toMins != null){
	  				toDate = toDate + ' '+ toHrs + ':' + toMins
	  			}

	  			if(toHrs != null && toMins == null){
	  				toDate = toDate + ' '+ toHrs + ':00'
	  			}

	  			return {
	  				'fromDate':fromDate,
	  				'toDate':toDate
	  			}
  			}
  			var modalInstance = null;
  			appService.openModal = function () {
					modalInstance = $uibModal.open({
					templateUrl: 'partials/spinner.html',
					windowClass: 'app-modal-window'
				})
			};

			appService.cancel =function(){
				modalInstance.dismiss('cancel');
			}

			var messageModalInstance = null;
			appService.openMessageModal = function(url){
				messageModalInstance = $uibModal.open({
					templateUrl:url
				})
			}

			appService.cancelMessageModal = function(){
				messageModalInstance.dismiss('cancel');
			}

			appService.showProgress = function(url) {
				this.openModal(url);
			}

			appService.hideProgress = function() {
				this.cancel();
			}

			appService.showMessage = function(statusMessage) {
				var msgModal = $uibModal.open({
					template:'<div class="modal-header"><h3 class="modal-title">'+statusMessage+'</h3></div>'
				});

				$timeout(function() {
					msgModal.dismiss('cancel');
				}, 2000);

			}
	 
			return appService;
		}
	})
})