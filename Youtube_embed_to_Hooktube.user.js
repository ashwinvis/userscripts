// ==UserScript==
// @name        Youtube embed to Hooktube
// @namespace   Krul & Brood
// @description Scan page for youtube embeds and replace with a Hooktube embed.
// @include     *
// @version     2.1.post0
// ==/UserScript==

var a = 0; //set to 1 to autoplay embedded videos present on initial page load (not recommended)
var b = 1; //set to 0 to not autoplay embedded videos that appear on page interaction

var observer = new MutationObserver(mutate);
observer.observe(document,{childList:true,attributes:true,subtree:true});

function mutate(){
  go(b);
}

function go(auto){
  var filter = Array.filter || Benchmark.filter;  
  var frames = document.getElementsByTagName("iframe");
  frames = filter(frames, youtubeiFrame);
  
  for(var i=0; i<frames.length; i++){
    let frame = frames[i];
    let src = frame.getAttribute('src');
    let hookTube = src.replace(/(youtube\-nocookie.com|youtube.com|youtu.be)/g, 'hooktube.com');
    if(hookTube.indexOf('?') === -1){
      hookTube += '?autoplay=' + auto;
    }else{
      hookTube += '&autoplay=' + auto;
    }
    frame.setAttribute('src', hookTube);
  }
}

function youtubeiFrame(el) {
  if(el.hasAttribute('src')){
    return el.getAttribute('src').indexOf('youtube') !== -1;
  }
  return false;
}

go(a);
