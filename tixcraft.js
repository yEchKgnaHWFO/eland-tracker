var ElandTracker=ElandTracker||{},eltkCount=0;
ElandTracker.Track=function(b,a){try{if("undefined"===typeof ElandTracker.isAllReady)if(50<eltkCount){if("function"===typeof a)throw Error("cannot load eland js");}else eltkCount++,setTimeout(ElandTracker.Track,100,b,a);else{var c=document.createElement("script");c.src="//dmp.eland-tech.com/dmpreceiver/el_load.min.js";var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);ElandTracker.callback=a;ElandTracker.startTrack(b)}}catch(e){console.error(e),"function"===typeof a&&
a()}};