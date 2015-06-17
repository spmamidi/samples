var Q = require('q');
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');


exports.uploadFile = function(fileName){
	var deferred = Q.defer();
	Q.fcall(function(){
		var delay = Math.random() * 4000 + 3000;
		logger.info("Starting Upload:" + fileName);
		setTimeout(function(){
			logger.info("completed upload:" + fileName);
			return deferred.resolve();
		});
	});
	return deferred.promise;
}
