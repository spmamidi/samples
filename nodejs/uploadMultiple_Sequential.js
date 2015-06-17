
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');
var uploader = require('./uploader');
var Q = require('q');

var fileNames = ["file1.jpg", "file2.jpg", "file3.jpg"];
var lastPromise = fileNames.reduce(function(promise, fileName){
	return promise.then(function(){
		return uploader.uploadFile(fileName);
	});
}, Q.resolve());


lastPromise
	.then(function(){
		logger.info('All files uploaded');
	})
	.catch(function(error){
		logger.error(error);
	});


