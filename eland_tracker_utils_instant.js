var ElandTracker=ElandTracker||{};ElandTracker.storageAvailable=function(a){var c;try{if(c=window[a],!c)return!1}catch(h){return!1}try{return c.setItem("__storage_test__","__storage_test__"),c.removeItem("__storage_test__"),!0}catch(l){return!1}};
ElandTracker.setCampaignCodes=function(a){if("undefined"!==typeof a&&ElandTracker.storageAvailable("sessionStorage"))try{a.utmSource&&(this.elandUtmSource=a.utmSource,sessionStorage.setItem("elandUtmSource",this.elandUtmSource)),a.adId&&(this.elandAdId=a.adId,sessionStorage.setItem("elandAdId",this.elandAdId))}catch(c){}};
ElandTracker.getCampaignCodeFromStorage=function(a){if("undefined"===typeof a||!ElandTracker.storageAvailable("sessionStorage"))return"";try{var c=sessionStorage.getItem(a);return c?c:""}catch(h){return""}};
ElandTracker.SendData=function(a){function c(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var d=a[b].split("\x3d");if("utm_medium"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return""}function h(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var d=a[b].split("\x3d");if("utm_campaign"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return""}function l(){for(var a=location.search.substring(1).split("\x26"),
b=0;b<a.length;b++){var d=a[b].split("\x3d");if("utm_term"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return""}function m(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var d=a[b].split("\x3d");if("utm_content"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return""}function n(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var d=a[b].split("\x3d");if("utm_source"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return ElandTracker.getCampaignCodeFromStorage("elandUtmSource")}
function p(){for(var a=location.search.substring(1).split("\x26"),b=0;b<a.length;b++){var d=a[b].split("\x3d");if("ad_id"===d[0])try{return decodeURIComponent(d[1])}catch(c){return d[1]}}return ElandTracker.getCampaignCodeFromStorage("elandAdId")}function q(a,b){var d=a.split("/"),c="";if(4<=d.length)for(var e=0;e<b;e++)if(4===d.length&&0===d[3].length){c="Web-Index";break}else if(d.length>3+e)c+=d[3+e]+"-";else break;else c="Web-Index";return c=c.split("?")[0]}var f={Android:function(){return navigator.userAgent.match(/Android/i)},
BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini|Opera Mobi/i)},Puffin:function(){return navigator.userAgent.match(/Puffin/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},Other:function(){return navigator.userAgent.match(/Mobile|Tablet/i)},any:function(){return f.Android()||f.BlackBerry()||f.iOS()||f.Opera()||f.Windows()||f.Puffin()||
f.Other()}},e=document.createElement("iframe"),b="",k="",k=ElandTracker.apiGateways.elandReceiverALL;this.receiveData=a.receiveData?a.receiveData:"0";b+="receiveData\x3d"+this.receiveData;this.tno=a.tno?a.tno:"";b+="\x26tno\x3d"+this.tno;this.callback=a.callback?a.callback:"";b+="\x26callback\x3d"+this.callback;this.trackType="view"==a.trackType?"view":"click";b+="\x26trackType\x3d"+this.trackType;this.os=navigator.userAgent.match(/Windows Phone/i)?"WindowsPhone":navigator.userAgent.match(/Android/i)?
"Android":navigator.userAgent.match(/iPhone|iPad|iPod/i)?"iOS":navigator.userAgent.match(/Windows NT/i)?"Windows":navigator.userAgent.match(/Macintosh/i)?"MacOS":"Others";this.platform="";f.any()?this.platform="Mobile":this.platform="PC";if("1"==a.receiveData){this.dmpSr=a.source?a.source:location.hostname;this.url=a.url?a.url:location.href;this.referUrl=a.referUrl?a.referUrl:document.referrer;this.target=a.targetType?a.targetType:"usual";this.subfolderDepth=a.trackSubfolderDepth?a.trackSubfolderDepth:
1;this.adSrTag=n();this.adIdTag=p();""!==this.adSrTag&&""!==this.adIdTag&&(this.campaignCodes={},this.campaignCodes.utmSource=this.adSrTag,this.campaignCodes.adId=this.adIdTag,ElandTracker.setCampaignCodes(this.campaignCodes));this.adMediumTag=c();this.adCampaignTag=h();this.adTermTag=l();this.adContentTag=m();this.browser=navigator.userAgent.match(/Edge/i)?"Edge":navigator.userAgent.match(/IEMobile/i)?"IEMobile":navigator.userAgent.match(/msie/i)||navigator.userAgent.match(/trident\/7/i)?"IE":navigator.userAgent.match(/Puffin/i)?
"Puffin":navigator.userAgent.match(/Dolfin/i)?"Dolfin":navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":navigator.userAgent.match(/Android/i)?"Android":navigator.userAgent.match(/UCBrowser/i)?"UCBrowser":navigator.userAgent.match(/Vivaldi/i)?"Vivaldi":navigator.userAgent.match(/Chrome/i)&&navigator.userAgent.match(/Safari/i)?"Chrome":navigator.userAgent.match(/Firefox/i)?"Firefox":navigator.userAgent.match(/Opera Mini/i)?"Opera Mini":navigator.userAgent.match(/Opera Mobi/i)?"Opera Mobi":navigator.userAgent.match(/Opera/i)?
"Opera":navigator.userAgent.match(/Chrome|CriOS/i)?"Chrome":navigator.userAgent.match(/Safari/i)?"Safari":"Others";this.subDomain=a.subFolder?a.subFolder:q(this.url,this.subfolderDepth);a.session&&(this.session=a.session);var g="";if(50>=this.dmpSr.length&&0<this.dmpSr.length)b+="\x26DMP_SR\x3d"+this.dmpSr;else throw g="[ElandTracker] The length of 'DMP_SR' is invalid.",console.log(g),Error(g);if(50>=this.target.length)b+="\x26target\x3d"+this.target;else throw g="[ElandTracker] The length of 'target' is invalid.",
console.log(g),Error(g);b+="\x26url\x3d"+encodeURIComponent(this.url)+"\x26refer_url\x3d"+encodeURIComponent(this.referUrl);b+="\x26platform\x3d"+this.platform;b+="\x26os\x3d"+this.os;b+="\x26browser\x3d"+this.browser;b+="\x26subDomain\x3d"+this.subDomain;""!==this.adSrTag&&(b+="\x26adSrTag\x3d"+this.adSrTag);""!==this.adIdTag&&(b+="\x26adIdTag\x3d"+this.adIdTag);""!==this.adMediumTag&&(b+="\x26adMediumTag\x3d"+this.adMediumTag);""!==this.adCampaignTag&&(b+="\x26adCampaignTag\x3d"+this.adCampaignTag);
""!==this.adTermTag&&(b+="\x26adTermTag\x3d"+this.adTermTag);""!==this.adContentTag&&(b+="\x26adContentTag\x3d"+this.adContentTag);b=navigator.cookieEnabled?b+"\x26ce\x3d1":b+"\x26ce\x3d0";this.session&&(b+="\x26session\x3d"+this.session);a.adInfo&&(b+="\x26info\x3d",a.adInfo.adSiteId&&(this.adSiteId=a.adInfo.adSiteId,b+=this.adSiteId),b+=",",a.adInfo.adZoneId&&(this.adZoneId=a.adInfo.adZoneId,b+=this.adZoneId),b+=",",a.adInfo.adId&&(this.adId=a.adInfo.adId,b+=this.adId),b+=",",a.adInfo.adBannerId&&
(this.adBannerId=a.adInfo.adBannerId,b+=this.adBannerId));a.ecInfo&&(a.ecInfo.itemName&&(this.itemName=a.ecInfo.itemName,b+="\x26item_name\x3d"+this.itemName),a.ecInfo.itemID&&(this.itemID=a.ecInfo.itemID,b+="\x26item_id\x3d"+this.itemID),a.ecInfo.memberID&&(this.memberID=a.ecInfo.memberID,b+="\x26member_id\x3d"+this.memberID),a.ecInfo.emailInfo&&(this.emailInfo=a.ecInfo.emailInfo,b+="\x26email\x3d"+this.emailInfo),a.ecInfo.payMoney&&(this.payMoney=a.ecInfo.payMoney,b+="\x26pay_money\x3d"+this.payMoney),
a.ecInfo.orderItemID&&(this.orderItemID=a.ecInfo.orderItemID,b+="\x26order_item_id\x3d"+this.orderItemID),a.ecInfo.orderItemName&&(this.orderItemName=a.ecInfo.orderItemName,b+="\x26order_item_name\x3d"+this.orderItemName),a.ecInfo.pvsess&&(this.pvsess=a.ecInfo.pvsess,b+="\x26pvsess\x3d"+this.pvsess));a.idMapping&&a.idMapping.googleId&&(this.googleId=a.idMapping.googleId,b+="\x26gid\x3d"+this.googleId)}a=a="";"Android"===this.os&&ElandTracker.getFingerPrintV3?ElandTracker.getFingerPrintV3.get(function(a){b+=
"\x26fp\x3d"+a;a=ElandTracker.commonBooleanSwitcher.attachIframeToBody?document.body:document.head;e.setAttribute("src",k+b);e.style.width="0px";e.style.height="0px";e.style.border="0px";e.style.display="none";e.setAttribute("alt","elandTracker");e.setAttribute("title","elandTracker");a.appendChild(e)}):("iOS"===this.os&&ElandTracker.getFingerPrint?(a=ElandTracker.getFingerPrint(),b+="\x26fp\x3d"+a):"PC"===this.platform&&ElandTracker.getFingerPrintV2&&(a=ElandTracker.getFingerPrintV2(),b+="\x26fp2\x3d"+
a),a=ElandTracker.commonBooleanSwitcher.attachIframeToBody?document.body:document.head,e.setAttribute("src",k+b),e.style.width="0px",e.style.height="0px",e.style.border="0px",e.style.display="none",e.setAttribute("alt","elandTracker"),e.setAttribute("title","elandTracker"),a.appendChild(e))};
ElandTracker.FlushData=function(){setTimeout(function(){var a=document.createElement("iframe");a.setAttribute("src",ElandTracker.apiGateways.elandReceiverDataFlush);a.style.width="0px";a.style.height="0px";a.style.border="0px";a.style.display="none";a.setAttribute("alt","elandTracker");a.setAttribute("title","elandTracker");document.body?document.body.appendChild(a):document.head&&document.head.appendChild(a)},1E3)};
ElandTracker.SendError=function(a){navigator&&navigator.userAgent&&(a=a+' ("'+navigator.userAgent+'")');var c=document.createElement("iframe"),h=ElandTracker.apiGateways.elandReceiverALL;a="DMP_SR\x3deland-rd4\x26target\x3ddebug\x26error_message\x3d"+a;location&&location.origin&&location.pathname&&(a=a+"\x26url\x3d"+encodeURIComponent(location.origin+location.pathname));c.setAttribute("src",h+a);c.style.width="0px";c.style.height="0px";c.style.border="0px";c.style.display="none";c.setAttribute("alt",
"elandTracker");c.setAttribute("title","elandTracker");document.body?document.body.appendChild(c):document.head&&document.head.appendChild(c)};ElandTracker.ready&&ElandTracker.ready();