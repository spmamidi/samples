
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');
var uploader = require('./uploader');
var Q = require('q');

var fileNames = ["file1.jpg", "file2.jpg", "file3.jpg"];
var promises = fileNames.map(uploader.uploadFile);

Q.allSettled(promises)
.then(function(results){
	logger.info("All Files Uplodaed. Results");
	logger.info(results.map(function(result){ 
		return result.state;
		}));
})
.catch(function(error){
	logger.error(error);
});




