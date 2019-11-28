#!/usr/bin/env node

//project type 2 build - bootstrap project

const fs = require("fs");
const cp = require("child_process");

const build = require("./module/build_tool");

var fileBuffer = fs.readFileSync("./build_me.json");
var fileString = fileBuffer.toString();
var fileObject = JSON.parse(fileString);

var bootstrapEndpoint = fileObject[1]["files"]["styles"][0]["bootstrap"];
var jqueryEndpoint = fileObject[1]["files"]["scripts"][0]["jquery"];

build.buildProject((data) => {
    const inArgumentIndex = process.argv.indexOf("-in");
    var inArgumentContent = "bootstrap_project";
    
    if (process.argv.indexOf("-in") != "-1") {
        inArgumentContent = process.argv[inArgumentIndex + 1];
    }
    
    var html_template = "";

    if (process.argv.indexOf("-atc") != "-1") { //-atc = add template code
        html_template = fs.readFileSync("pt2_templates/html_template.txt").toString();
    }
    
    var stylesDirectory = Object.getOwnPropertyNames(data[1]["files"])[1];
    var scriptsDirectory = Object.getOwnPropertyNames(data[1]["files"])[2];
    
    fs.mkdirSync(`${inArgumentContent}`, { recursive: true });
    fs.mkdirSync(`${inArgumentContent}/${stylesDirectory}`, { recursive: true });
    fs.mkdirSync(`${inArgumentContent}/${scriptsDirectory}`, { recursive: true });
    
    fs.writeFile(`${inArgumentContent}/${data[1]["files"]["_"][0]}`, html_template, () => {});
    fs.writeFile(`${inArgumentContent}/${stylesDirectory}/${data[1]["files"][stylesDirectory][1]}`, " ", () => {});
    fs.writeFile(`${inArgumentContent}/${scriptsDirectory}/${data[1]["files"][scriptsDirectory][1]}`, " ", () => {});
    
    var infoString = "Web project with libraries created. \nFiles created: \nindex.html \nstyles (folder): \n\tbootstrap (folder with downloaded library) \n\tstyle.css \nscripts (folder): \n\tjquery (folder with downloaded library) \n\tscript.js";
    
    fs.writeFile(`${inArgumentContent}/readme.txt`, infoString, () => { 
        console.log("Project created. \nFor more information open the readme file.");
    });

});

var baseDownloadFunction = (data, directory) => {
    const inArgumentIndex = process.argv.indexOf("-in");
    var inArgumentContent = "bootstrap_project";

    if (process.argv.indexOf("-in") != "-1") {
        inArgumentContent = process.argv[inArgumentIndex + 1];
    }

    cp.exec(`git clone ${data["html_url"]} ${inArgumentContent}/${directory}/${data["name"]}`);
};

build.downloadLibrary(bootstrapEndpoint, (data) => {
    baseDownloadFunction(data, "styles");
});

build.downloadLibrary(jqueryEndpoint, (data) => {
    baseDownloadFunction(data, "scripts");
});




