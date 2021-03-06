 // npm i request jsdom 
const request = require('request');
const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const allMatchPageObj = require("./allMatchSerialPage");
const helperObj = require("./helper");
let url = "https://www.espncricinfo.com/series/ipl-2021-1249214";

let iplPath = path.join(__dirname, "ipl");

helperObj.dirCreater(iplPath);

request(url, cb);
function cb(error, response, body) {
    if (error) {
        console.log('error:', error.message);
    } else if (response && response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log("content recieved");
        extractData(body);
    }
}
function extractData(body) {
    const JSDOM = jsdom.JSDOM;
    let dom = new JSDOM(body);
    let document = dom.window.document;

    let element = document.querySelector(".ds-block.ds-text-center.ds-uppercase.ds-text-ui-typo-primary.ds-underline-offset-4")
    let link = element.getAttribute("href");
    
    let AllMatchPageKaLink = "https://www.espncricinfo.com" + link;
    console.log(AllMatchPageKaLink);
    // allmatch page
    allMatchPageObj.AllmatchFn(AllMatchPageKaLink)

}
