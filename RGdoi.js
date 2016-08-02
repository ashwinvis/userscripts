// ==UserScript==
// @name        RGdoi
// @namespace   https://www.researchgate.net
// @description Detect DOIs as hyperlinks
// @include     http://www.researchgate.net/publication/*
// @include     https://www.researchgate.net/publication/*
// @version     0.0.2b
// @grant       none
// ==/UserScript==


function rgdoi()
{
    openDoi(window.top)
}

var matchRegexpGlobal = /DOI:.*/mg;
var extractRegexp = /(?:DOI:\s)([\w\.\/\-])*/g;

function openDoi(win)
{
    var root = "http://dx.doi.org/";

    var text = win.document.body.textContent;
    while((match = matchRegexpGlobal.exec(text)) != null) {
        var doi = extractRegexp.exec(match[0]);
        if (doi != null) {
            var doi_link = doi[0].replace(/DOI\:\s/i, "");
            alert('DOI detected');
            replaceElement(doi_link);
        }
    }
    for (var i = 0, n = win.frames.length; i < n; i++)
        openDoi(win.frames[i]);
}


function replaceElement(doi) {
    var divs = document.querySelectorAll(".publication-meta-secondary");
    var element = divs[0];
    var replace = '<a href="http://dx.doi.org/' + doi +'">' + element.innerHTML +  '</a>';
    element.innerHTML = replace;
}


rgdoi()
