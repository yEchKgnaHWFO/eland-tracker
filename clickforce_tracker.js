var ElandTracker=ElandTracker||{};ElandTracker.commonBooleanSwitcher={useTestingEnvironment:!1,isTixcraftTracker:!1,attachIframeToBody:!0,useJsdelivrToLoadJS:!0};
ElandTracker.apiGateways=ElandTracker.commonBooleanSwitcher.useTestingEnvironment?{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@1.0.24/",elandReceiver:"//dmp.eland-tech.com/receivertesting/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/receivertesting/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/receivertesting/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/receivertesting/dataflush"}:
{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@1.0.24/",elandReceiver:"//dmp.eland-tech.com/dmpreceiver/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/dmpreceiver/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/dmpreceiver/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/dmpreceiver/dataflush"};"undefined"===typeof ElandTracker.DelayCallbackList&&(ElandTracker.DelayCallbackList=[]);
ElandTracker.delay=function(a,b){ElandTracker.DelayCallbackList.push([a,b])};ElandTracker.ready=function(){if(ElandTracker.DelayCallbackList&&0<ElandTracker.DelayCallbackList.length){do{var a=ElandTracker.DelayCallbackList.shift();a&&setTimeout(function(a){a[0].call(this,a[1])},100,a)}while(0<ElandTracker.DelayCallbackList.length)}};
ElandTracker.isAllReady=function(){return document.body&&ElandTracker.ClickforceTrack&&ElandTracker.getFingerPrintV4&&ElandTracker.ClickforceSendData&&ElandTracker.SendError?!0:!1};ElandTracker.onErrorLoadJsFromCDN=function(){ElandTracker.commonBooleanSwitcher.useJsdelivrToLoadJS=!1;ElandTracker.getFingerPrintV4||ElandTracker.loadjsfile("eland_fingerprint.js");ElandTracker.ClickforceSendData||ElandTracker.loadjsfile("eland_tracker_utils.js")};
ElandTracker.loadjsfile=function(a){var b;b=document.createElement("script");b.setAttribute("type","text/javascript");ElandTracker.commonBooleanSwitcher.useJsdelivrToLoadJS?(b.setAttribute("src",ElandTracker.apiGateways.elandTracker+a),b.setAttribute("onerror","ElandTracker.onErrorLoadJsFromCDN()")):b.setAttribute("src",ElandTracker.apiGateways.elandReceiver+a);if(void 0!==b)switch(a){case "eland_fingerprint.js":ElandTracker.getFingerPrintV4||document.getElementsByTagName("head")[0].appendChild(b);
break;case "eland_tracker_utils.js":ElandTracker.ClickforceSendData||document.getElementsByTagName("head")[0].appendChild(b);break;default:document.getElementsByTagName("head")[0].appendChild(b)}};ElandTracker.loadjsfile("eland_fingerprint.js");ElandTracker.loadjsfile("eland_tracker_utils.js");
ElandTracker.ClickforceTrack=function(a){if("undefined"===typeof a)ElandTracker.SendError("Didn't send data due to undefined trackingJson.");else{if("undefined"===typeof a.retriedTimes)a.retriedTimes=1;else if(a.retriedTimes+=1,100<a.retriedTimes){ElandTracker.SendError("Didn't send data due to the retried times being greater than the limit.");return}if(ElandTracker.isAllReady())try{ElandTracker.ClickforceSendData(a)}catch(b){"undefined"!==typeof b.message&&ElandTracker.SendError(b.message)}else ElandTracker.delay(ElandTracker.ClickforceTrack,
a),setTimeout(ElandTracker.ready,1E3)}};function dmpSr_view_log(a,b,c){ElandTracker.ClickforceTrack({source:a,trackType:"view",sp_variable:b,cf_uid:c})}function dmpSr_click_log(a,b,c){ElandTracker.ClickforceTrack({source:a,trackType:"click",sp_variable:b,cf_uid:c})}function stfpjs(a,b){setTimeout(function(){"function"==typeof ElandTracker.getFingerPrintV4&&(a+="\x26fp\x3d"+ElandTracker.getFingerPrintV4);document.getElementById(b).contentDocument.getElementById("cfzfsc").src=a},1200)}
function cookie_mapping(a){a="//dmp.eland-tech.com/dmpreceiver/cookie_transfer.jsp?target\x3d"+a;var b=document.createElement("iframe");b.src=a;b.setAttribute("style","display:none");b.setAttribute("height","0");b.setAttribute("width","0");document.body.appendChild(b)};