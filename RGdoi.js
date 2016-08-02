// ==UserScript==
// @name        RGdoi
// @namespace   https://www.researchgate.net
// @description Detect DOIs as hyperlinks
// @include     http://www.researchgate.net/publication/*
// @include     https://www.researchgate.net/publication/*
// @version     0.0.3a
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// TODO: Make hyperlink by without using the alert box
// TODO: Avoid Content Security Policy (CSP) or HTTP access control (CORS) violations

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
            // var popup = window.open(root + doi_link);
            // popup.blur();
            // window.focus();
            alert('DOI detected');
            replaceElement(doi_link);
            /*
            GM_xmlhttpRequest({
              method: "POST",
              url: "https://*.researchgate.net/",
              data: "username=avmo@kth.se&password=12089j",
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              onload: function(response) {
                alert('DOI detected');
                replaceElement(doi_link);
              }
            });*/
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


// AUTO OPEN MODE
rgdoi()

// LINK BELOW TO OPEN DOI
/*
var link=document.createElement("a");
//link.type="button"; //when Element is of type input
link.class="btn btn-promote btn-large js-promo-request-fulltext can-request";
link.onclick = rgdoi;

var button=document.createElement("div");
button.class="publication-action-container";
button.innerHTML="Open DOI";
button.style.display="inline";

//var divs = document.querySelectorAll(".publication-actions");
//divs[0].appendChild(button);
//divs[0].insertBefore(link,divs[0].firstChild);
link.appendChild(button);
document.body.appendChild(link);
*/
