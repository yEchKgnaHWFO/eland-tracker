var ElandTracker=ElandTracker||{};ElandTracker.commonBooleanSwitcher={useTestingEnvironment:!1,isTixcraftTracker:!1,attachIframeToBody:!0,useJsdelivrToLoadJS:!0};ElandTracker.jsVersions={eland_fingerprint:"?version\x3d1.0.22",eland_tracker_utils:"?version\x3d1.0.22"};
ElandTracker.apiGateways=ElandTracker.commonBooleanSwitcher.useTestingEnvironment?{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@latest/",elandReceiver:"//dmp.eland-tech.com/receivertesting/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/receivertesting/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/receivertesting/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/receivertesting/dataflush"}:
{elandTracker:"//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@latest/",elandReceiver:"//dmp.eland-tech.com/dmpreceiver/",elandReceiverProfile:"//dmp.eland-tech.com/profile_receiver/profile_receiver?",elandReceiverView:"//dmp.eland-tech.com/dmpreceiver/viewreceiver?",elandReceiverClick:"//dmp.eland-tech.com/dmpreceiver/clickreceiver?",elandReceiverDataFlush:"//dmp.eland-tech.com/dmpreceiver/dataflush"};"undefined"===typeof ElandTracker.DelayCallbackList&&(ElandTracker.DelayCallbackList=[]);
ElandTracker.delay=function(b,a){ElandTracker.DelayCallbackList.push([b,a])};ElandTracker.ready=function(){if(ElandTracker.DelayCallbackList&&0<ElandTracker.DelayCallbackList.length){do{var b=ElandTracker.DelayCallbackList.shift();b&&setTimeout(function(a){a[0].call(this,a[1])},100,b)}while(0<ElandTracker.DelayCallbackList.length)}};
ElandTracker.isAllReady=function(){return document.body&&ElandTracker.ClickforceTrack&&ElandTracker.getFingerPrintV4&&ElandTracker.ClickforceSendData&&ElandTracker.SendError?!0:!1};ElandTracker.onErrorLoadJsFromCDN=function(){ElandTracker.commonBooleanSwitcher.useJsdelivrToLoadJS=!1;ElandTracker.getFingerPrintV4||ElandTracker.loadjsfile("eland_fingerprint.js");ElandTracker.ClickforceSendData||ElandTracker.loadjsfile("eland_tracker_utils.js")};
ElandTracker.loadjsfile=function(b){var a;a=document.createElement("script");a.setAttribute("type","text/javascript");ElandTracker.commonBooleanSwitcher.useJsdelivrToLoadJS?(a.setAttribute("src",ElandTracker.apiGateways.elandTracker+b),a.setAttribute("onerror","ElandTracker.onErrorLoadJsFromCDN()")):a.setAttribute("src",ElandTracker.apiGateways.elandReceiver+b);if(void 0!==a){var c=a.getAttribute("src");switch(b){case "eland_fingerprint.js":ElandTracker.getFingerPrintV4||(a.setAttribute("src",c+ElandTracker.jsVersions.eland_fingerprint),
document.getElementsByTagName("head")[0].appendChild(a));break;case "eland_tracker_utils.js":ElandTracker.ClickforceSendData||(a.setAttribute("src",c+ElandTracker.jsVersions.eland_tracker_utils),document.getElementsByTagName("head")[0].appendChild(a));break;default:document.getElementsByTagName("head")[0].appendChild(a)}}};ElandTracker.loadjsfile("eland_fingerprint.js");ElandTracker.loadjsfile("eland_tracker_utils.js");
ElandTracker.ClickforceTrack=function(b){if("undefined"===typeof b)ElandTracker.SendError("Didn't send data due to undefined trackingJson.");else{if("undefined"===typeof b.retriedTimes)b.retriedTimes=1;else if(b.retriedTimes+=1,100<b.retriedTimes){ElandTracker.SendError("Didn't send data due to the retried times being greater than the limit.");return}if(ElandTracker.isAllReady())try{ElandTracker.ClickforceSendData(b)}catch(a){"undefined"!==typeof a.message&&ElandTracker.SendError(a.message)}else ElandTracker.delay(ElandTracker.ClickforceTrack,
b),setTimeout(ElandTracker.ready,1E3)}};function dmpSr_view_log(b,a,c){ElandTracker.ClickforceTrack({source:b,trackType:"view",sp_variable:a,cf_uid:c})}function dmpSr_click_log(b,a,c){ElandTracker.ClickforceTrack({source:b,trackType:"click",sp_variable:a,cf_uid:c})}function stfpjs(b,a){setTimeout(function(){"function"==typeof ElandTracker.getFingerPrintV4&&(b+="\x26fp\x3d"+ElandTracker.getFingerPrintV4);document.getElementById(a).contentDocument.getElementById("cfzfsc").src=b},1200)}
function cookie_mapping(b){b="//dmp.eland-tech.com/dmpreceiver/cookie_transfer.jsp?target\x3d"+b;var a=document.createElement("iframe");a.src=b;a.setAttribute("style","display:none");a.setAttribute("height","0");a.setAttribute("width","0");document.body.appendChild(a)};