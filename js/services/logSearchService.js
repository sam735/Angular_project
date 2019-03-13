define(['app', 'appConfig'],function(app, appConfig){
	app.provider('logSearchService',['appConfig',function(appConfig){

		this.$get = function($http,appService){
			var logSearchService = {};
			var logs = {
				couriers:[]
			}

			var baseUrl = appConfig.trackingBaseUrl;

			var config = {
	                headers : {
	                    'Content-Type': 'application/json'
	                }
            	};
			
			logSearchService.getCourier = function(searchParam,nextPage){
				var url = baseUrl + 'couriers?';
				url = url + 'skip=' + searchParam.skip +'&';
				if(searchParam.courierName != null){
					url = url + 'couriername='+ searchParam.courierName + '&';
				}

				if(searchParam.metaData[0].metaData != null){
					var count = searchParam.metaData.length;
					var x ='';
					if(count != 0){
						for(var data=0; data<count; data++ ){
							x = x +'Metadata=' + searchParam.metaData[data].metaData 
							+':'+searchParam.metaData[data].value + '&';
						}

						url = url + x; 
					}
				}
				if(searchParam.courierType != null){
					url = url + 'couriertype=' + searchParam.courierType + '&';
				}

				if(searchParam.fromDate !=null){
					url = url + 'fromdate=' + searchParam.fromDate +'&';
				}

				if(searchParam.toDate !=null){
					url = url + 'todate=' + searchParam.toDate;
				}
				appService.showProgress();
				$http.get(url,config).success(function(resp){
					var fetchedItems = resp.Couriers;
					logs.courierCount = resp.CourierCount;
					addElement(fetchedItems,nextPage);
					appService.hideProgress();
				},function(error){
					appService.hideProgress();
					logs.error = error;
				});

				return logs;
			}

			var spinnerActivation = function(){
				logs.loading = !logs.loading;
			}

			var addElement = function(fetchedItems,nextPage){
				if(nextPage){
					logs.couriers = logs.couriers.concat(fetchedItems);
				}
				else{
					logs.couriers = [];
					logs.couriers = logs.couriers.concat(fetchedItems);

				}
				
			}

			logSearchService.getCourierDetails = function(courierId){
				var url = baseUrl + 'tracking/' + courierId;
				return $http.get(url,config)
				
			} 

			logSearchService.snapshot = function(){
				var url = baseUrl + 'couriers/snapshot?from=2018-08-27T16:16:31.7303007&to=2018-08-31T16:16:31.7303007';
				return $http.get(url,config);
			}

			return logSearchService;
		}
	}])
})