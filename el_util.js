var ElandTracker = ElandTracker || {};
ElandTracker.apiGateways = {
    "elandReceiverALL": "//dmp.eland-tech.com/dmpreceiver/uidTransfer?",
    "elandReceiverView": "//dmp.eland-tech.com/dmpreceiver/viewreceiver?",
    "elandReceiverClick": "//dmp.eland-tech.com/dmpreceiver/clickreceiver?",
    "elandReceiverDataFlush": "//dmp.eland-tech.com/dmpreceiver/dataflush"
};
ElandTracker.storageAvailable = function (type) {
    'use strict';

    var storage;
    try {
        storage = window[type];
        if (!storage) {
            return false;
        }
    } catch (e) {
        return false;
    }

    try {
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
};
ElandTracker.setCampaignCodes = function (campaignCodes) {
    'use strict';

    if (typeof campaignCodes === "undefined") {
        return;
    }
    if (!ElandTracker.storageAvailable('sessionStorage')) {
        return;
    }

    try {
        if (campaignCodes.utmSource) {
            this.elandUtmSource = campaignCodes.utmSource;
            sessionStorage.setItem('elandUtmSource', this.elandUtmSource);
        }

        if (campaignCodes.adId) {
            this.elandAdId = campaignCodes.adId;
            sessionStorage.setItem('elandAdId', this.elandAdId);
        }
    } catch (e) {
        return;
    }
};
ElandTracker.getCampaignCodeFromStorage = function (codeName) {
    'use strict';

    if (typeof codeName === "undefined" ||
        !ElandTracker.storageAvailable('sessionStorage')) {
        return "";
    }

    return sessionStorage.getItem(codeName) || "";
};
ElandTracker.getIframeUrl = function (jsonObject) {
    function setFlag(flag) {
        var d = new Date();
        d.setTime(d.getTime() + (1000));
        var expires = "expires=" + d.toUTCString();
        var cookieString = flag + '=' + d.toDateString() + '; ' + expires + '; path=/';
        document.cookie = cookieString;
    };
    function getFlag(flag) {
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            if (c.length > 1) {
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
            }
            if (c.indexOf(flag) === 0) {
                return c.substring(flag.length, c.length);
            }
        }
        return "";
    };
    function getOS(userAgent) {
        if (userAgent === undefined) {
            return "";
        } else if (userAgent.match(/Windows Phone/i)) {
            return "WindowsPhone";
        } else if (userAgent.match(/Android/i)) {
            return "Android";
        } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
            return "iOS";
        } else if (userAgent.match(/Windows NT/i)) {
            return "Windows";
        } else if (userAgent.match(/Macintosh/i)) {
            return "MacOS";
        } else {
            return "Others";
        }
    };
    function getBrowser(userAgent) {
        if (userAgent === undefined) {
            return "";
        }
        else if (userAgent.match(/Edge|edg/i)) {
            return "Edge";
        }
        else if (userAgent.match(/Dalvik/i)) {
            return "Android";
        }
        else if (userAgent.match(/IEMobile/i)) {
            return "IEMobile";
        }
        else if (userAgent.match(/msie|trident\/7/i)) {
            return "IE";
        }
        else if (userAgent.match(/Puffin/i)) {
            return "Puffin";
        }
        else if (userAgent.match(/Dolfin/i)) {
            return "Dolfin";
        }
        else if (userAgent.match(/BlackBerry/i)) {
            return "BlackBerry";
        }
        else if (userAgent.match(/uc\s?browser|\subrowser/i)) {
            return "UCBrowser";
        }
        else if (userAgent.match(/Vivaldi/i)) {
            return "Vivaldi";
        }
        else if (userAgent.match(/Opera|opr/i)) {
            return "Opera";
        }
        else if (userAgent.match(/SamsungBrowser|FB|Instagram|\sline|MiuiBrowser|Baidu|bidubrowser|MicroMessenger/i)
            || userAgent.match(/wechat|Telegram|Slack|WhatsApp|KAKAOTALK/i)) {
            return "Others";
        }
        else if (userAgent.match(/mobile Safari/i) && userAgent.match(/android/i) && userAgent.match(/version/i)) {
            if (userAgent.match(/chrome/i)) {
                return "Chrome";
            } else {
                return "Android"
            }
        }
        else if (userAgent.match(/Chrome/i) && userAgent.match(/Safari/i)) {
            return "Chrome";
        }
        else if (userAgent.match(/Firefox|FxiOS/i)) {
            return "Firefox";
        }
        else if (userAgent.match(/Opera Mini/i)) {
            return "Opera Mini";
        }
        else if (userAgent.match(/Opera Mobi/i)) {
            return "Opera Mobi";
        }
        else if (userAgent.match(/Chrome|CriOS/i)) {
            return "Chrome";
        }
        else if (userAgent.match(/Safari/i)) {
            return "Safari";
        }
        else {
            return "Others";
        }
    };
    function getAdMedium() {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "utm_medium") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }

        return "";
    };
    function getAdCampaign() {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "utm_campaign") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }

        return "";
    };
    function getAdTerm() {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "utm_term") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }

        return "";
    };
    function getAdContent() {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "utm_content") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }

        return "";
    };
    function getAdSrVariable() {
        var query = location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "utm_source") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }
        return ElandTracker.getCampaignCodeFromStorage("elandUtmSource");
    };
    function getAdIdVariable() {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "ad_id") {
                try {
                    return decodeURIComponent(pair[1]);
                } catch (e) {
                    return pair[1];
                }
            }
        }

        return ElandTracker.getCampaignCodeFromStorage("elandAdId");
    };
    function getPlatform(userAgent) {
        if (userAgent === undefined) {
            return "";
        } else {
            return (
                userAgent.match(/Android/i) ||
                userAgent.match(/BlackBerry/i) ||
                userAgent.match(/iPhone|iPad|iPod/i) ||
                userAgent.match(/Opera Mini|Opera Mobi/i) ||
                userAgent.match(/Puffin/i) ||
                userAgent.match(/IEMobile/i) ||
                userAgent.match(/Mobile|Tablet/i)
            ) ? "Mobile" : "PC";
        }
    };
    function getSubDomain(pageUrl, depth) {
        var hrefSplit = pageUrl.split("/");
        var result = "";
        if (hrefSplit.length >= 4) {
            for (var i = 0; i < depth; i++) {
                if (hrefSplit.length === 4 && hrefSplit[3].length === 0) {
                    result = "Web-Index";
                    break;
                } else if (hrefSplit.length > 3 + i) {
                    result += (hrefSplit[3 + i] + "-");
                } else {
                    break;
                }
            }
        } else {
            result = "Web-Index";
        }
        result = result.split("?")[0];
        return result;
    };
    function getIframeUrl(jsonObject) {
        // Json Decoder
        var message = ""; //error message
        var iframeUrl = ""; //iframe url

        if (jsonObject.tno !== undefined) { //即時查詢
            this.tno = jsonObject.tno; // tno->對方uid
            this.receiveData = jsonObject.receiveData || "0"; // Do Receive data receiveData->代碼
            this.callback = jsonObject.callback || ""; // callback
            iframeUrl = ElandTracker.apiGateways.elandReceiverALL; // 即時 receiver url
            iframeUrl += "&tno=" + this.tno;
            iframeUrl += "&receiveData=" + this.receiveData;
            iframeUrl += "&callback=" + this.callback;
        } else if (jsonObject.trackType === "click") { //非即時 receiver url
            iframeUrl = ElandTracker.apiGateways.elandReceiverClick;
        } else {
            iframeUrl = ElandTracker.apiGateways.elandReceiverView;
        }

        if (document.domain &&
            document.domain.indexOf("tixcraft") !== -1 ||
            jsonObject.source === "tixcraft") { //拓元
            if (getFlag("_eel=") || getFlag("_eul=")) {
                return;
            } else if (!getFlag("_eul=" &&
                jsonObject.hasOwnProperty("ecInfo") &&
                jsonObject.ecInfo.hasOwnProperty("emailInfo"))) {
                setFlag("_eel");
                setFlag("_eul");
            } else {
                setFlag("_eul");
            }
            this.dmpSr = "tixcraft";
            this.subfolderDepth = 3;
        } else { //非拓元
            this.subfolderDepth = jsonObject.trackSubfolderDepth || 1;
            this.dmpSr = jsonObject.source || location.hostname;
        }

        if (jsonObject.receiveData !== "0") { //僅即時不收資料時不進入

            this.trackType = jsonObject.trackType || "view";
            this.target = jsonObject.targetType || "usual";
            // collecting needed information
            this.url = jsonObject.url || location.href;
            this.referUrl = jsonObject.referUrl || document.referrer;
            this.adSrTag = getAdSrVariable();
            this.adIdTag = getAdIdVariable();
            if (this.adSrTag !== "" && this.adIdTag !== "") {
                this.campaignCodes = {};
                this.campaignCodes.utmSource = this.adSrTag;
                this.campaignCodes.adId = this.adIdTag;
                this.setCampaignCodes(this.campaignCodes);
            }
            this.adMediumTag = getAdMedium();
            this.adCampaignTag = getAdCampaign();
            this.adTermTag = getAdTerm();
            this.adContentTag = getAdContent();
            this.os = getOS(navigator.userAgent);
            this.browser = getBrowser(navigator.userAgent);
            this.platform = getPlatform();
            this.subDomain = jsonObject.subFolder || getSubDomain(this.url, this.subfolderDepth);
            this.session = jsonObject.session || "";

            if (this.dmpSr.length <= 50 && this.dmpSr.length > 0) {
                iframeUrl += "&DMP_SR=" + this.dmpSr;
            } else {
                message = "[ElandTracker] The length of 'DMP_SR' is invalid.";
                console.log(message);
                throw new Error(message);
            }

            if (this.target.length <= 50) {
                iframeUrl += "&target=" + this.target;
            } else {
                message = "[ElandTracker] The length of 'target' is invalid.";
                console.log(message);
                throw new Error(message);
            }

            iframeUrl += "&url=" + encodeURIComponent(this.url) + "&refer_url=" + encodeURIComponent(this.referUrl);
            iframeUrl += "&platform=" + this.platform;
            iframeUrl += "&os=" + this.os;
            iframeUrl += "&browser=" + this.browser;
            iframeUrl += "&subDomain=" + this.subDomain;
            iframeUrl += "&trackType=" + this.trackType;

            if (this.adSrTag !== "") {
                iframeUrl += "&adSrTag=" + this.adSrTag;
            }
            if (this.adIdTag !== "") {
                iframeUrl += "&adIdTag=" + this.adIdTag;
            }
            if (this.adMediumTag !== "") {
                iframeUrl += "&adMediumTag=" + this.adMediumTag;
            }
            if (this.adCampaignTag !== "") {
                iframeUrl += "&adCampaignTag=" + this.adCampaignTag;
            }
            if (this.adTermTag !== "") {
                iframeUrl += "&adTermTag=" + this.adTermTag;
            }
            if (this.adContentTag !== "") {
                iframeUrl += "&adContentTag=" + this.adContentTag;
            }
            if (navigator.cookieEnabled) {
                iframeUrl += "&ce=1";
            } else {
                iframeUrl += "&ce=0";
            }
            if (this.session) {
                iframeUrl += "&session=" + this.session;
            }
            if (jsonObject.adInfo) {
                iframeUrl += "&info=";
                if (jsonObject.adInfo.adSiteId) {
                    this.adSiteId = jsonObject.adInfo.adSiteId;
                    para += this.adSiteId;
                }
                iframeUrl += ",";
                if (jsonObject.adInfo.adZoneId) {
                    this.adZoneId = jsonObject.adInfo.adZoneId;
                    para += this.adZoneId;
                }
                iframeUrl += ",";
                if (jsonObject.adInfo.adId) {
                    this.adId = jsonObject.adInfo.adId;
                    para += this.adId;
                }
                iframeUrl += ",";
                if (jsonObject.adInfo.adBannerId) {
                    this.adBannerId = jsonObject.adInfo.adBannerId;
                    iframeUrl += this.adBannerId;
                }
            }
            if (jsonObject.ecInfo) {
                if (jsonObject.ecInfo.itemName) {
                    this.itemName = jsonObject.ecInfo.itemName;
                    iframeUrl += "&item_name=" + this.itemName;
                }
                if (jsonObject.ecInfo.itemID) {
                    this.itemID = jsonObject.ecInfo.itemID;
                    iframeUrl += "&item_id=" + this.itemID;
                }
                if (jsonObject.ecInfo.memberID) {
                    this.memberID = jsonObject.ecInfo.memberID;
                    iframeUrl += "&member_id=" + this.memberID;
                }
                if (jsonObject.ecInfo.emailInfo) {
                    this.emailInfo = jsonObject.ecInfo.emailInfo;
                    iframeUrl += "&email=" + this.emailInfo;
                }
                if (jsonObject.ecInfo.payMoney) {
                    this.payMoney = jsonObject.ecInfo.payMoney;
                    iframeUrl += "&pay_money=" + this.payMoney;
                }
                if (jsonObject.ecInfo.orderItemID) {
                    this.orderItemID = jsonObject.ecInfo.orderItemID;
                    iframeUrl += "&order_item_id=" + this.orderItemID;
                }
                if (jsonObject.ecInfo.orderItemName) {
                    this.orderItemName = jsonObject.ecInfo.orderItemName;
                    iframeUrl += "&order_item_name=" + this.orderItemName;
                }
                if (jsonObject.ecInfo.pvsess) {
                    this.pvsess = jsonObject.ecInfo.pvsess;
                    iframeUrl += "&pvsess=" + this.pvsess;
                }
            }
            if (jsonObject.idMapping && jsonObject.idMapping.googleId) {
                this.googleId = jsonObject.idMapping.googleId;
                iframeUrl += "&gid=" + this.googleId;
            }
        }

        if (ElandTracker.getFingerPrintV4) {
            if (this.os === "Android" || this.os === "iOS") {
                iframeUrl += "&fp=";
            } else {
                iframeUrl += "&fp2=";
            }
            iframeUrl += ElandTracker.getFingerPrintV4 + "&";
        }
        return iframeUrl;
    };
    return getIframeUrl(jsonObject);
};
ElandTracker.getIframe = function (urlValue) {
    var iframe_data = document.createElement('iframe');
    iframe_data.setAttribute("src", urlValue);
    iframe_data.style.width = 0 + "px";
    iframe_data.style.height = 0 + "px";
    iframe_data.style.border = 0 + "px";
    iframe_data.style.display = "none";
    iframe_data.setAttribute("alt", "elandTracker");
    iframe_data.setAttribute("title", "elandTracker");
    return iframe_data;
};
ElandTracker.sendData = function (trackingJson) {
    var iframeUrl = ElandTracker.getIframeUrl(trackingJson);
    console.log(iframeUrl);
    var iframeElement = this.getIframe(iframeUrl);
    return document.body.appendChild(iframeElement);

};
ElandTracker.flushData = function () {
    setTimeout(function () {
        'use strict';
        var urlValue = ElandTracker.apiGateways.elandReceiverDataFlush;
        var iframeElement = this.getIframe(urlValue);
        return document.body.appendChild(iframeElement);
    }, 1000);
};
ElandTracker.sendError = function (message) {
    'use strict';

    if (navigator && navigator.userAgent) {
        message = message + " (\"" + navigator.userAgent + "\")";
    }
    var urlValue = ElandTracker.apiGateways.elandReceiverView;
    var para = "DMP_SR=eland-rd4&target=debug&error_message=" + message;
    if (location && location.origin && location.pathname) {
        para = para + "&url=" + encodeURIComponent(location.origin + location.pathname);
    }
    var iframeElement = this.getIframe(urlValue + para);
    return document.body.appendChild(iframeElement);
};
ElandTracker.getClickForceIframeUrl = function (trackingJson) {
    'use strict';
    // eland function
    function getOS(userAgent) {
        if (userAgent.match(/Windows Phone/i)) {
            return "WindowsPhone";
        } else if (userAgent.match(/Android/i)) {
            return "Android";
        } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
            return "iOS";
        } else if (userAgent.match(/Windows NT/i)) {
            return "Windows";
        } else if (userAgent.match(/Macintosh/i)) {
            return "MacOS";
        } else {
            return "Others";
        }
    }

    function getBrowser(userAgent) {
        if (userAgent.match(/Edge|edg/i)) {
            return "Edge";
        }
        else if (userAgent.match(/Dalvik/i)) {
            return "Android";
        }
        else if (userAgent.match(/IEMobile/i)) {
            return "IEMobile";
        }
        else if (userAgent.match(/msie|trident\/7/i)) {
            return "IE";
        }
        else if (userAgent.match(/Puffin/i)) {
            return "Puffin";
        }
        else if (userAgent.match(/Dolfin/i)) {
            return "Dolfin";
        }
        else if (userAgent.match(/BlackBerry/i)) {
            return "BlackBerry";
        }
        else if (userAgent.match(/UCBrowser/i)) {
            return "UCBrowser";
        }
        else if (userAgent.match(/Vivaldi/i)) {
            return "Vivaldi";
        }
        else if (userAgent.match(/Opera|opr/i)) {
            return "Opera";
        }
        else if (userAgent.match(/Chrome/i) && userAgent.match(/mobile Safari/i) && userAgent.match(/SamsungBrowser|FB|Instagram/i)) {
            return "Others";
        }
        else if (userAgent.match(/mobile Safari/i) && userAgent.match(/android/i) && userAgent.match(/version/i)) {
            if (userAgent.match(/chrome/i)) {
                return "Chrome";
            } else if (userAgent.match(/Baidu/i)) {
                return "Others";
            } else {
                return "Android"
            }
        }
        else if (userAgent.match(/Chrome/i) && userAgent.match(/Safari/i)) {
            return "Chrome";
        }
        else if (userAgent.match(/Firefox/i)) {
            return "Firefox";
        }
        else if (userAgent.match(/Opera Mini/i)) {
            return "Opera Mini";
        }
        else if (userAgent.match(/Opera Mobi/i)) {
            return "Opera Mobi";
        }
        else if (userAgent.match(/Chrome|CriOS/i)) {
            return "Chrome";
        }
        else if (userAgent.match(/Safari/i)) {
            return "Safari";
        }
        else {
            return "Others";
        }
    }

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini|Opera Mobi/i);
        },
        Puffin: function () {
            return navigator.userAgent.match(/Puffin/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        Other: function () {
            return navigator.userAgent.match(/Mobile|Tablet/i);
        },
        any: function () {
            return (
                isMobile.Android() || isMobile.BlackBerry() ||
                isMobile.iOS() || isMobile.Opera() || isMobile.Windows() ||
                isMobile.Puffin() || isMobile.Other()
            );
        }
    };

    function getSubDomain(pageUrl, depth) {
        var hrefSplit = pageUrl.split("/");
        var result = "";
        if (hrefSplit.length >= 4) {
            for (var i = 0; i < depth; i++) {
                if (hrefSplit.length === 4 && hrefSplit[3].length === 0) {
                    result = "Web-Index";
                    break;
                } else if (hrefSplit.length > 3 + i) {
                    result += (hrefSplit[3 + i] + "-");
                } else {
                    break;
                }
            }
        } else {
            result = "Web-Index";
        }

        result = result.split("?")[0];

        return result;
    }

    // clickforce function
    function htmlEscape(str) {
        return str.toLowerCase()
            .replace(">", "").replace("<", "").replace(";", "")
            .replace("script", "").replace("alert", "")
            .replace("img", "").replace("frame", "").replace("input", "")
            .replace("title", "").replace("body", "");
    }
    function getAdSrVariableClickforce() {
        var query = location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == "AD_SR" || pair[0] == "ad_sr") {
                return pair[1];
            }
        }
        return "";
    }

    // Json Decoder
    var jsonObject = trackingJson;

    // clickforce
    if (jsonObject.trackSubfolderDepth) {
        this.subfolderDepth = jsonObject.trackSubfolderDepth;
    } else {
        this.subfolderDepth = 1;
    }
    if (jsonObject.targetType) {
        this.target = jsonObject.targetType;
    } else {
        this.target = "ad";
    }
    if (jsonObject.url) {
        this.url = jsonObject.url;
    } else {
        this.url = htmlEscape(location.href);
    }
    if (jsonObject.referUrl) {
        this.referUrl = jsonObject.referUrl;
    } else {
        this.referUrl = htmlEscape(document.referrer);
    }
    this.adSrTag = getAdSrVariableClickforce();
    if (jsonObject.cf_uid) {
        this.cf_uid = jsonObject.cf_uid;
    }

    var infoTemp = jsonObject.sp_variable.split(",");
    for (var i = 0; i < infoTemp.length && i < 4; i++) {
        if (this.info != null) {
            this.info += ",";
            this.info += infoTemp[i];
        } else {
            this.info = infoTemp[i];
        }
    }

    // eland
    if (jsonObject.source) {
        this.dmpSr = jsonObject.source;
    } else {
        this.dmpSr = location.hostname;
    }
    if (this.dmpSr.length > 50 && this.dmpSr.length <= 0) {
        message = "[ElandTracker] The length of 'DMP_SR' is invalid.";
        console.log(message);
        throw new Error(message);
    }
    if (jsonObject.trackType) {
        this.trackType = jsonObject.trackType;
    } else {
        this.trackType = "view";
    }
    this.os = getOS(navigator.userAgent);
    this.browser = getBrowser(navigator.userAgent);
    this.platform = "";
    if (isMobile.any()) {
        this.platform = "Mobile";
    } else {
        this.platform = "PC";
    }
    if (jsonObject.subFolder) {
        this.subDomain = jsonObject.subFolder;
    } else {
        this.subDomain = getSubDomain(this.url, this.subfolderDepth);
    }

    var iframeUrl = "https://cm.g.doubleclick.net/pixel";
    var message = "";

    if (this.trackType == "view") {
        iframeUrl += "?google_nid=clickforce_dmp&google_cm&log_type=view";
    } else {
        iframeUrl += "?google_nid=clickforce_dmp&google_cm&log_type=click";
    }
    iframeUrl += "&DMP_SR=" + this.dmpSr;
    iframeUrl += "&url=" + encodeURIComponent(this.url) + "&refer_url=" + encodeURIComponent(this.referUrl);
    iframeUrl += "&platform=" + this.platform;
    iframeUrl += "&os=" + this.os;
    iframeUrl += "&browser=" + this.browser;
    iframeUrl += "&subDomain=" + this.subDomain;
    iframeUrl += "&info=" + this.info;
    iframeUrl += "&cf_uid=" + this.cf_uid;
    if (this.adSrTag !== "") {
        iframeUrl += "&adSrTag=" + this.adSrTag;
    }

    if (this.target.length <= 50) {
        iframeUrl += "&target=" + this.target;
    } else {
        message = "[ElandTracker] The length of 'target' is invalid.";
        console.log(message);
        throw new Error(message);
    }

    if (navigator.cookieEnabled) {
        iframeUrl += "&ce=1";
    } else {
        iframeUrl += "&ce=0";
    }

    if (ElandTracker.getFingerPrintV4) {
        if (this.os === "Android" || this.os === "iOS") {
            iframeUrl += "&fp=";
        } else {
            iframeUrl += "&fp2=";
        }
        iframeUrl += ElandTracker.getFingerPrintV4 + "&";
    }
    return iframeUrl
};
ElandTracker.ClickforceSendData = function (trackingJson) {
    'use strict';
    var iframeUrl = ElandTracker.getClickForceIframeUrl(trackingJson);
    var iframeElement = ElandTracker.getIframe(iframeUrl);
    return document.body.appendChild(iframeElement);
}