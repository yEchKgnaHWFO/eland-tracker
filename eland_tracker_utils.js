var ElandTracker=ElandTracker||{};ElandTracker.storageAvailable=function(a){var c;try{if(c=window[a],!c)return!1}catch(h){return!1}try{return c.setItem("__storage_test__","__storage_test__"),c.removeItem("__storage_test__"),!0}catch(f){return!1}};
ElandTracker.setCampaignCodes=function(a){if("undefined"!==typeof a&&ElandTracker.storageAvailable("sessionStorage"))try{a.utmSource&&(this.elandUtmSource=a.utmSource,sessionStorage.setItem("elandUtmSource",this.elandUtmSource)),a.adId&&(this.elandAdId=a.adId,sessionStorage.setItem("elandAdId",this.elandAdId))}catch(c){}};
ElandTracker.getCampaignCodeFromStorage=function(a){if("undefined"===typeof a||!ElandTracker.storageAvailable("sessionStorage"))return"";try{var c=sessionStorage.getItem(a);return c?c:""}catch(h){return""}};
ElandTracker.SendDataNopd=function(a){function c(){var a=navigator.userAgent.toLowerCase(),c=-1!==a.indexOf("windows");if(-1!==a.indexOf("windows nt 10")||-1!==a.indexOf("wm 10"))c=!1;return c}function h(){var a=navigator.userAgent.match(/Edge/i)?"Edge":navigator.userAgent.match(/IEMobile/i)?"IEMobile":navigator.userAgent.match(/msie/i)||navigator.userAgent.match(/trident\/7/i)?"IE":"Others";return-1!==a.indexOf("Edge")||-1!==a.indexOf("IEMobile")||-1!==a.indexOf("IE")?!0:!1}var f={Android:function(){return navigator.userAgent.match(/Android/i)},
BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini|Opera Mobi/i)},Puffin:function(){return navigator.userAgent.match(/Puffin/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},Other:function(){return navigator.userAgent.match(/Mobile|Tablet/i)},any:function(){return f.Android()||f.BlackBerry()||f.iOS()||f.Opera()||f.Windows()||f.Puffin()||
f.Other()}};this.dmpSr=a.source?a.source:location.hostname;this.trackType=a.trackType?a.trackType:"view";this.target=a.targetType?a.targetType:"usual";a.subFolder&&(this.subDomain=a.subFolder);var g=document.createElement("iframe"),n="",d="",n="view"===this.trackType?ElandTracker.apiGateways.elandReceiverView:ElandTracker.apiGateways.elandReceiverClick,e="";if(50>=this.dmpSr.length&&0<this.dmpSr.length)d+="DMP_SR\x3d"+this.dmpSr;else throw e="[ElandTracker] The length of 'DMP_SR' is invalid.",console.log(e),
Error(e);if(50>=this.target.length)d+="\x26target\x3d"+this.target;else throw e="[ElandTracker] The length of 'target' is invalid.",console.log(e),Error(e);this.platform="";f.any()?this.platform="Mobile":this.platform="PC";d+="\x26platform\x3dOthers\x26os\x3dOthers";d+="\x26browser\x3dOthers";d+="\x26subDomain\x3d"+this.subDomain;d=navigator.cookieEnabled?d+"\x26ce\x3d1":d+"\x26ce\x3d0";a.ecInfo&&a.ecInfo.memberID&&(this.memberID=a.ecInfo.memberID,d+="\x26member_id\x3d"+this.memberID);a="";a=navigator.userAgent.match(/iPhone|iPad|iPod/i)?
"iOS":"Others";"iOS"!==a&&navigator.cookieEnabled||!ElandTracker.getFingerPrint||(a=ElandTracker.getFingerPrint(),d+="\x26fp\x3d"+a);a="";"PC"===this.platform&&h()&&c()&&ElandTracker.getFingerPrintV2&&(a=ElandTracker.getFingerPrintV2(),d+="\x26fp2\x3d"+a);d+="\x26nopd\x3d1";a=document.body;g.setAttribute("src",n+d);g.style.width="0px";g.style.height="0px";g.style.border="0px";g.style.display="none";g.setAttribute("alt","elandTracker");g.setAttribute("title","elandTracker");a.appendChild(g)};
ElandTracker.SendData=function(a){function c(a){var b=new Date;b.setTime(b.getTime()+1E3);var m="expires\x3d"+b.toUTCString();a=a+"\x3d"+b.toDateString()+"; "+m+"; path\x3d/";document.cookie=a}function h(a){for(var b=document.cookie.split(";"),m=0;m<b.length;m++){var c=b[m];if(1<c.length)for(;" "===c.charAt(0);)c=c.substring(1);if(0===c.indexOf(a))return c.substring(a.length,c.length)}return""}function f(a){return a.match(/Edge/i)?"Edge":a.match(/IEMobile/i)?"IEMobile":a.match(/msie/i)||a.match(/trident\/7/i)?
"IE":a.match(/Puffin/i)?"Puffin":a.match(/Dolfin/i)?"Dolfin":a.match(/BlackBerry/i)?"BlackBerry":a.match(/Android/i)?"Android":a.match(/UCBrowser/i)?"UCBrowser":a.match(/Vivaldi/i)?"Vivaldi":a.match(/Chrome/i)&&a.match(/Safari/i)?"Chrome":a.match(/Firefox/i)?"Firefox":a.match(/Opera Mini/i)?"Opera Mini":a.match(/Opera Mobi/i)?"Opera Mobi":a.match(/Opera/i)?"Opera":a.match(/Chrome|CriOS/i)?"Chrome":a.match(/Safari/i)?"Safari":"Others"}function g(){var a=navigator.userAgent.toLowerCase(),b=-1!==a.indexOf("windows");
if(-1!==a.indexOf("windows nt 10")||-1!==a.indexOf("wm 10"))b=!1;return b}function n(){var a=f(navigator.userAgent);return-1!==a.indexOf("Edge")||-1!==a.indexOf("IEMobile")||-1!==a.indexOf("IE")?!0:!1}function d(a,b){var c=a.split("/"),d="";if(4<=c.length)for(var e=0;e<b;e++)if(4===c.length&&0===c[3].length){d="Web-Index";break}else if(c.length>3+e)d+=c[3+e]+"-";else break;else d="Web-Index";return d=d.split("?")[0]}var e={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},
iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini|Opera Mobi/i)},Puffin:function(){return navigator.userAgent.match(/Puffin/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},Other:function(){return navigator.userAgent.match(/Mobile|Tablet/i)},any:function(){return e.Android()||e.BlackBerry()||e.iOS()||e.Opera()||e.Windows()||e.Puffin()||e.Other()}};if(ElandTracker.commonBooleanSwitcher.isTixcraftTracker){if(h("_eel\x3d"))return;
if(h("_eul\x3d")){if(h("_eul\x3d"))return;c("_eul")}else a.hasOwnProperty("ecInfo")&&a.ecInfo.hasOwnProperty("emailInfo")&&(c("_eel"),c("_eul"));this.dmpSr="tixcraft"}else this.dmpSr=a.source?a.source:location.hostname;this.trackType=a.trackType?a.trackType:"view";this.target=a.targetType?a.targetType:"usual";this.subfolderDepth=ElandTracker.commonBooleanSwitcher.isTixcraftTracker?3:a.trackSubfolderDepth?a.trackSubfolderDepth:1;this.url=location.href;this.referUrl=document.referrer;this.adSrTag=function(){for(var a=
location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=a[b].split("\x3d");if("utm_source"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return ElandTracker.getCampaignCodeFromStorage("elandUtmSource")}();this.adIdTag=function(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=a[b].split("\x3d");if("ad_id"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return ElandTracker.getCampaignCodeFromStorage("elandAdId")}();""!==
this.adSrTag&&""!==this.adIdTag&&(this.campaignCodes={},this.campaignCodes.utmSource=this.adSrTag,this.campaignCodes.adId=this.adIdTag,ElandTracker.setCampaignCodes(this.campaignCodes));this.adMediumTag=function(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=a[b].split("\x3d");if("utm_medium"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return""}();this.adCampaignTag=function(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=
a[b].split("\x3d");if("utm_campaign"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return""}();this.adTermTag=function(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=a[b].split("\x3d");if("utm_term"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return""}();this.adContentTag=function(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var c=a[b].split("\x3d");if("utm_content"===c[0])try{return decodeURIComponent(c[1])}catch(d){return c[1]}}return""}();
this.os=navigator.userAgent.match(/Windows Phone/i)?"WindowsPhone":navigator.userAgent.match(/Android/i)?"Android":navigator.userAgent.match(/iPhone|iPad|iPod/i)?"iOS":navigator.userAgent.match(/Windows NT/i)?"Windows":navigator.userAgent.match(/Macintosh/i)?"MacOS":"Others";this.browser=f(navigator.userAgent);this.platform="";e.any()?this.platform="Mobile":this.platform="PC";this.subDomain=a.subFolder?a.subFolder:d(this.url,this.subfolderDepth);a.session&&(this.session=a.session);var k=document.createElement("iframe");
document.createElement("iframe");var p="",b="",p="view"==this.trackType?ElandTracker.apiGateways.elandReceiverView:ElandTracker.apiGateways.elandReceiverClick,l="";if(50>=this.dmpSr.length&&0<this.dmpSr.length)b+="DMP_SR\x3d"+this.dmpSr;else throw l="[ElandTracker] The length of 'DMP_SR' is invalid.",console.log(l),Error(l);if(50>=this.target.length)b+="\x26target\x3d"+this.target;else throw l="[ElandTracker] The length of 'target' is invalid.",console.log(l),Error(l);b+="\x26url\x3d"+encodeURIComponent(this.url)+
"\x26refer_url\x3d"+encodeURIComponent(this.referUrl);b+="\x26platform\x3d"+this.platform;b+="\x26os\x3d"+this.os;b+="\x26browser\x3d"+this.browser;b+="\x26subDomain\x3d"+this.subDomain;""!==this.adSrTag&&(b+="\x26adSrTag\x3d"+this.adSrTag);""!==this.adIdTag&&(b+="\x26adIdTag\x3d"+this.adIdTag);""!==this.adMediumTag&&(b+="\x26adMediumTag\x3d"+this.adMediumTag);""!==this.adCampaignTag&&(b+="\x26adCampaignTag\x3d"+this.adCampaignTag);""!==this.adTermTag&&(b+="\x26adTermTag\x3d"+this.adTermTag);""!==
this.adContentTag&&(b+="\x26adContentTag\x3d"+this.adContentTag);b=navigator.cookieEnabled?b+"\x26ce\x3d1":b+"\x26ce\x3d0";this.session&&(b+="\x26session\x3d"+this.session);a.adInfo&&(b+="\x26info\x3d",a.adInfo.adSiteId&&(this.adSiteId=a.adInfo.adSiteId,b+=this.adSiteId),b+=",",a.adInfo.adZoneId&&(this.adZoneId=a.adInfo.adZoneId,b+=this.adZoneId),b+=",",a.adInfo.adId&&(this.adId=a.adInfo.adId,b+=this.adId),b+=",",a.adInfo.adBannerId&&(this.adBannerId=a.adInfo.adBannerId,b+=this.adBannerId));a.ecInfo&&
(a.ecInfo.itemName&&(this.itemName=a.ecInfo.itemName,b+="\x26item_name\x3d"+this.itemName),a.ecInfo.itemID&&(this.itemID=a.ecInfo.itemID,b+="\x26item_id\x3d"+this.itemID),a.ecInfo.memberID&&(this.memberID=a.ecInfo.memberID,b+="\x26member_id\x3d"+this.memberID),a.ecInfo.emailInfo&&(this.emailInfo=a.ecInfo.emailInfo,b+="\x26email\x3d"+this.emailInfo),a.ecInfo.payMoney&&(this.payMoney=a.ecInfo.payMoney,b+="\x26pay_money\x3d"+this.payMoney),a.ecInfo.orderItemID&&(this.orderItemID=a.ecInfo.orderItemID,
b+="\x26order_item_id\x3d"+this.orderItemID),a.ecInfo.orderItemName&&(this.orderItemName=a.ecInfo.orderItemName,b+="\x26order_item_name\x3d"+this.orderItemName),a.ecInfo.pvsess&&(this.pvsess=a.ecInfo.pvsess,b+="\x26pvsess\x3d"+this.pvsess));a.idMapping&&a.idMapping.googleId&&(this.googleId=a.idMapping.googleId,b+="\x26gid\x3d"+this.googleId);a="";"iOS"!==this.os&&navigator.cookieEnabled||!ElandTracker.getFingerPrint||(a=ElandTracker.getFingerPrint(),b+="\x26fp\x3d"+a);a="";"PC"===this.platform&&n()&&
g()&&ElandTracker.getFingerPrintV2&&(a=ElandTracker.getFingerPrintV2(),b+="\x26fp2\x3d"+a);a=ElandTracker.commonBooleanSwitcher.attachIframeToBody?document.body:document.head;k.setAttribute("src",p+b);k.style.width="0px";k.style.height="0px";k.style.border="0px";k.style.display="none";k.setAttribute("alt","elandTracker");k.setAttribute("title","elandTracker");a.appendChild(k)};
ElandTracker.FlushData=function(){setTimeout(function(){var a=document.createElement("iframe");a.setAttribute("src",ElandTracker.apiGateways.elandReceiverDataFlush);a.style.width="0px";a.style.height="0px";a.style.border="0px";a.style.display="none";a.setAttribute("alt","elandTracker");a.setAttribute("title","elandTracker");document.body?document.body.appendChild(a):document.head&&document.head.appendChild(a)},1E3)};
ElandTracker.SendError=function(a){navigator&&navigator.userAgent&&(a=a+' ("'+navigator.userAgent+'")');var c=document.createElement("iframe"),h=ElandTracker.apiGateways.elandReceiverView;a="DMP_SR\x3deland-rd4\x26target\x3ddebug\x26error_message\x3d"+a;location&&location.origin&&location.pathname&&(a=a+"\x26url\x3d"+encodeURIComponent(location.origin+location.pathname));c.setAttribute("src",h+a);c.style.width="0px";c.style.height="0px";c.style.border="0px";c.style.display="none";c.setAttribute("alt",
"elandTracker");c.setAttribute("title","elandTracker");document.body?document.body.appendChild(c):document.head&&document.head.appendChild(c)};ElandTracker.ready&&ElandTracker.ready();