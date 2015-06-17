var Q = require('q');
var request = require("request");
var log4js = require('log4js');
var logger = log4js.getLogger('uploader');
var fs = require('fs');

exports.downloadFile = function (uri, fileName, callback) {
	var deferred = Q.defer();
    request.head(uri, function (err, res, body) {
        if (res && res.headers)
        {
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);
            deferred.resolve(fileName);
        }
        else{
            deferred.reject('file is not downloaded ' + fileName);
        }
    });
    return deferred.promise;
};


exports.downloadImage = function (uri, fileName, callback) {
	var deferred = Q.defer();
    request.head(uri, function (err, res, body) {
        if (res && res.headers && res.headers['content-type'].indexOf('image')>-1)
        {
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);
            deferred.resolve(fileName);
        }
        else{
            deferred.reject('file is not downloaded ' + fileName);
        }
    });
    return deferred.promise;
};