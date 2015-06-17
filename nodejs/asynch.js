var request = require("request");
var Q  = require('q');
var _ = require('lodash-node');
var fs = require('fs');
var storage = require('azure-storage');
var directoryName = 'Images/';


console.log('testing');

var items = [{
    imageUrl : 'https://smamidi.blob.core.windows.net/images/00482b17-f8b2-4733-a4a1-9bcab6a3000c.jpeg'
},
{
    imageUrl : 'https://smamidi.blob.core.windows.net/images/00615b14-b239-405d-a8f7-ee52dbcf48d0.jpeg'
},
{
    imageUrl : 'https://smamidi.blob.core.windows.net/images/0081b5f4-38d4-4cbc-89ce-8b4a7c87c7ab.jpeg'
}];
    
var promise =   

// azure image url update

//Downloading Image 
var downloadImage = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        if (res && res.headers && res.headers['content-type'].indexOf('image')>-1)
        {
            //console.log(res);
            //console.log('content-type:' + res.headers['content-type']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

        }
    });
};

//genarating uid for Downloaded Image 
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

//uploading  Image 
function uploadImage(sourceFileName, destinationFileName) {
    var blobService = storage.createBlobService();
    var containerName = 'images';
    blobService.createBlockBlobFromLocalFile(
    containerName,
    destinationFileName,
    sourceFileName,
    function (error, result, response) {
        //console.log(sourceFileName);
        //console.log(destinationFileName);
        if (error) {
            console.log("Couldn't upload file %s", destinationFileName);
            console.error(error);
        } else {
            console.log('File %s uploaded successfully', destinationFileName);
        }
    });
}

//download upload images
function downloadUploadImages(products) {
    products.forEach(function (item) {
        var downloadedFileName = generateUUID() + '.jpeg';
        downloadImage(item.imageUrl, directoryName + downloadedFileName, function () {
                console.log('download done');
                uploadImage(directoryName + downloadedFileName, downloadedFileName);
        });
        var resultImageUrl = "https://smamidi.blob.core.windows.net/images/" + downloadedFileName;
        item.imageUrl = resultImageUrl;
        console.log(resultImageUrl);
    });
}

