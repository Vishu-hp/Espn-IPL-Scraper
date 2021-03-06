const request = require('request');
const fs = require("fs");
const jsdom = require("jsdom");
const scoreCardObj = require("./scorecard");
function AllMatchPageExecutor(url) {
    request(url, cb);

}
function cb(error, response, body) {
    if (error) {
        console.log('error:', error.message); 
    } else if (response && response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log("content recieved");
        // console.log(body);
        extractData(body);
    }
}
function extractData(body) {
    const JSDOM = jsdom.JSDOM;
    let dom = new JSDOM(body); 
    let document = dom.window.document;
    let matchBoxes = document.querySelectorAll(".ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent")
   
    requestSender(matchBoxes, 0);

    console.log("```````````````````````````````````````````````");
}

function requestSender(matchBoxes, n) {
    if (matchBoxes.length == n) {
        return;
    }
    let curMatch = matchBoxes[n];
    let allAnchors = curMatch.querySelectorAll("a");
    let scoreCardAnchor = allAnchors[2];
    let link = scoreCardAnchor.getAttribute("href");
    let scoreCardLink = "https://www.espncricinfo.com" + link;
    //     scoreCardObj.scoreCardFn(scoreCardLink);
    request(scoreCardLink, reqcb);
    function reqcb(error, response, body) {
        if (error) {
            console.log('error:', error.message); 
        } else if (response && response.statusCode == 404) {
            console.log("Page not found");
        } else {
            console.log("content recieved");
            // console.log(body);
            scoreCardObj.extractData(body);
            requestSender(matchBoxes, n + 1);
        }
    }

}



module.exports = {
    AllmatchFn: AllMatchPageExecutor
}

