var ElandTracker=ElandTracker||{};ElandTracker.commonBooleanSwitcher={useTestingEnvironment:!0,isTixcraftTracker:!1,attachIframeToBody:!0,useJsdelivrToLoadJS:!0};
ElandTracker.apiGateways=ElandTracker.commonBooleanSwitcher.useTestingEnvironment?{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@1/",elandReceiver:"//dmp.eland-tech.com/receivertesting/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/receivertesting/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/receivertesting/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/receivertesting/dataflush"}:{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@1/",
elandReceiver:"//dmp.eland-tech.com/dmpreceiver/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/dmpreceiver/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/dmpreceiver/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/dmpreceiver/dataflush"};ElandTracker.DelayCallbackList=[];ElandTracker.delay=function(b,a){ElandTracker.DelayCallbackList=[];ElandTracker.DelayCallbackList.push([b,a])};
ElandTracker.ready=function(){if(ElandTracker.DelayCallbackList&&0<ElandTracker.DelayCallbackList.length){var b=ElandTracker.DelayCallbackList.shift();b&&setTimeout(function(a){a[0].call(this,a[1])},100,b)}};ElandTracker.isAllReady=function(){return document.body&&ElandTracker.md5&&ElandTracker.Track&&ElandTracker.getFingerPrint&&ElandTracker.SendData&&ElandTracker.SendError?!0:!1};
ElandTracker.loadjsfile=function(b){var a;a=document.createElement("script");a.setAttribute("type","text/javascript");ElandTracker.commonBooleanSwitcher.useJsdelivrToLoadJS?a.setAttribute("src",ElandTracker.apiGateways.elandTracker+b):a.setAttribute("src",ElandTracker.apiGateways.elandReceiver+b);void 0!==a&&document.getElementsByTagName("head")[0].appendChild(a)};
ElandTracker.loadjsCdn=function(b){var a;a=document.createElement("script");a.setAttribute("type","text/javascript");a.setAttribute("src","https://cdnjs.cloudflare.com/"+b);void 0!==a&&document.getElementsByTagName("head")[0].appendChild(a)};ElandTracker.loadjsfile("md5.js");ElandTracker.loadjsfile("eland_fingerprint.js");ElandTracker.loadjsfile("eland_tracker_utils.js");
ElandTracker.Track=function(b){if("undefined"===typeof b)ElandTracker.SendError("Didn't send data due to undefined trackingJson.");else{if("undefined"===typeof b.retriedTimes)b.retriedTimes=1;else if(b.retriedTimes+=1,100<b.retriedTimes){ElandTracker.SendError("Didn't send data due to the retried times being greater than the limit.");return}if(ElandTracker.isAllReady())try{ElandTracker.SendData(b)}catch(a){"undefined"!==typeof a.message&&ElandTracker.SendError(a.message)}else ElandTracker.delay(ElandTracker.Track,
b),setTimeout(ElandTracker.ready,3E3)}};