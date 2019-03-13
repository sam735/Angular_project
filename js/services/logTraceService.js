define(['app','appConfig'],function(app,appConfig){
	app.provider('logTraceService',function(){

		this.$get = function($http,appConfig){
			var logTraceService ={};

			var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
			var baseUrl = appConfig.baseUrl;

			logTraceService.getLogs = function(logsDetail,nextPage){
				url = baseUrl + '/api/v1/trace?PageSize=10'+'&Position='+ nextPage;
				if(logsDetail.module != null){
					url = url +'&Module=' + logsDetail.module; 
				}

				if(logsDetail.msgSrchTrm != null){
					url = url + '&MessageSearchTerm=' + logsDetail.msgSrchTrm;
				}

				if(logsDetail.srcComponent != null){
					url = url + '&SourceComponent=' + logsDetail.srcComponent; 
				}

				if(logsDetail.lebels != null){

					var count = logsDetail.lebels.length;
					var x ='';
					if(count != 0){
						for(var lebel=0; lebel<count; lebel++ ){
							x = x +'&Levels=' + logsDetail.lebels[lebel];
						}

						url = url + x; 
					}
				}

				if(logsDetail.fromDate != null){
					url = url + '&FromDate' + logsDetail.fromDate;
				}

				if(logsDetail.toDate != null){
					url = url +'&ToDate' + logsDetail.toDate;
				}

				return $http.get(url,config);
			}
			return logTraceService;
		}
	});
})