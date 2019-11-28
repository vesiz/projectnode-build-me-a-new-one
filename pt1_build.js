#!/usr/bin/env node

//project type 1 build - simple web project

const fs = require("fs");

const build = require("./module/build_tool");

build.buildProject((data) => {
    const inArgumentIndex = process.argv.indexOf("-in");
    var inArgumentContent = "simple_web_project";
    var infoString = "Simple web project created. \nFiles created: \nindex.html \nstyle.css \nscript.js";
    var html_template = ""; 
    
    if (process.argv.indexOf("-in") != "-1") {
        inArgumentContent = process.argv[inArgumentIndex + 1];
    }
    
    if (process.argv.indexOf("-atc") != "-1") { //-atc = add template code
        html_template = fs.readFileSync("pt1_templates/html_template.txt").toString();
    }

    fs.mkdirSync(`${inArgumentContent}`, { recursive: true });

    for(var item in data[0]["files"]["_"]){

        if(data[0]["files"]["_"][item] == "index.html"){
            fs.writeFile(`${inArgumentContent}/${data[0]["files"]["_"][item]}`,html_template, () => { });
        }else{
            fs.writeFile(`${inArgumentContent}/${data[0]["files"]["_"][item]}`, " ", () => { });
        }
    }

    fs.writeFile(`${inArgumentContent}/readme.txt`, infoString, () => { 
        console.log("Project created. \nFor more information view the readme file.");
    });
});