const fs = require("fs");
const http = require("https");

const buildProject = (callback) => {
    var fileBuffer = fs.readFileSync("./build_me.json");
    var fileString = fileBuffer.toString();
    var responseObject = JSON.parse(fileString);

    callback(responseObject);
};

const downloadLibrary = (libraryEndpoint, callback) => {

    const requestParameterCollection = {
        headers : {
            "User-Agent" : "Test User Agent"
        }
    };

    var requestStreamCollection = [];
    var responseObject          = null;
    
    http.get(libraryEndpoint, requestParameterCollection, (res) => {

        res.on("data", (chunk) => {
            requestStreamCollection.push(chunk);
        });
        
        res.on("end" , () => {
            responseObject = JSON.parse(requestStreamCollection.join(" "));
            callback(responseObject);
        }); 
    });
};


module.exports = {
    buildProject,
    downloadLibrary
};