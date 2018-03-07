// ==UserScript==
// @name        RGdoi
// @namespace   https://www.researchgate.net
// @description Detect DOIs as hyperlinks
// @include     http://www.researchgate.net/publication/*
// @include     https://www.researchgate.net/publication/*
// @version     0.0.4a
// @grant       GM.xmlHttpRequest
// ==/UserScript==

// TODO: Modify regexp to work after logging in.

var matchRegexpGlobal = /DOI:.*/mg;
var extractRegexp = /(?:DOI:\s)([\w\.\/\-])*/g;

function extractDoiAndHyperlink(text)
{
    var root = "https://doi.org/";

    // var text = window.document.body.textContent;
    while((match = matchRegexpGlobal.exec(text)) != null) {
        var doi = extractRegexp.exec(match[0]);
        if (doi != null) {
            var doi_link = doi[0].replace(/DOI\:\s/i, "");
            replaceElement(doi_link);
        }
    }
}


function replaceElement(doi) {
    var divs = document.querySelectorAll(".publication-meta-secondary");
    var element = divs[0];
    var replace = '<a href="https://doi.org/' + doi +'">' + element.innerHTML +  '</a>';
    element.innerHTML = replace;
}

// Old method: which gets blocked 
// extractDoiAndHyperlink(window.top)

GM.xmlHttpRequest({
  method: "GET",
  url: location.href,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
    extractDoiAndHyperlink(response.responseText);
  }
});
