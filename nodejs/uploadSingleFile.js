
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');
var uploader = require('./uploader');

var fileName = "file1.jpg";
var promise = uploader.uploadFile(fileName);
promise.then(function(result){
	logger.info('the file has been uploaded');
}).catch(function(error){
	logger.error('error');
});



