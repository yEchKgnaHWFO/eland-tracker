var ElandTracker = ElandTracker || {};

ElandTracker.options = {
    "elandTracker": "//cdn.jsdelivr.net/gh/yEchKgnaHWFO/eland-tracker@4.6.1/",
    "elandReceiver": "//dmp.eland-tech.com/dmpreceiver/",
    "useJsdelivrToLoadJS": true,
    "useFingerprint": false
};
ElandTracker.delayCallbackList = [];

ElandTracker.delay = function (callback, args) {
    'use strict';
    ElandTracker.delayCallbackList.push([callback, args]);
};

ElandTracker.ready = function () {
    'use strict';

    if (ElandTracker.delayCallbackList
        && ElandTracker.delayCallbackList.length > 0) {
        do {
            var d = ElandTracker.delayCallbackList.shift();
            if (d) {
                setTimeout(function (d) {
                    d[0].call(this, d[1]);
                }, 100, d);
            }
        } while (ElandTracker.delayCallbackList.length > 0);
    }
};

fingerPrint_3_4_1Cookie = getCookieValue("fingerPrint_3_4_1");
console.log("fingerPrint_3_4_1Cookie = " + fingerPrint_3_4_1Cookie)

function getCookieValue(cookieName) {
    var cookieValue = "";
    var cookies = document.cookie.split(";"); // 將所有的Cookie拆分為陣列

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // 去除前後空格
        // 檢查Cookie名稱是否匹配
        if (cookie.indexOf(cookieName + "=") === 0) {
            // 獲取Cookie的值
            cookieValue = cookie.substring(cookieName.length + 1);
            break;
        }
    }
    // 返回Cookie的值
    return cookieValue;
}

ElandTracker.isAllReady = function () {
    if (ElandTracker.useFingerprint) {
        return (document.body
            && ElandTracker.getFingerPrintV4
            && ElandTracker.getFingerPrint_3_4_1
            && ElandTracker.sendData)
    } else {
        return (document.body
            && ElandTracker.sendData)
    }
};

ElandTracker.onErrorLoadJsFromCDN = function () {
    'use strict';

    ElandTracker.options.useJsdelivrToLoadJS = false;
    if (!ElandTracker.getFingerPrintV4) {
        ElandTracker.loadjsfile("el_fingerprint.min.js");
    }
    if (!ElandTracker.getFingerPrint_3_4_1) {
        if (!fingerPrint_3_4_1Cookie || fingerPrint_3_4_1Cookie == "")
            ElandTracker.loadjsfile("el_fp_test.min.js");
    }
    if (!ElandTracker.SendData) {
        ElandTracker.loadjsfile("el_util.min.js");
    }
};

ElandTracker.loadjsfile = function (filename) {
    'use strict';

    var fileref;
    fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    if (ElandTracker.options.useJsdelivrToLoadJS) {
        fileref.setAttribute("src", ElandTracker.options.elandTracker + filename);
        fileref.setAttribute("onerror", "ElandTracker.onErrorLoadJsFromCDN()");
        fileref.defer = true;
    } else {
        fileref.setAttribute("src", ElandTracker.options.elandReceiver + filename);
        fileref.defer = true;
    }

    switch (filename) {
        case 'el_fingerprint.min.js':
            if (!ElandTracker.getFingerPrintV4) {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            break;
        case 'el_util.min.js':
            if (!ElandTracker.SendData) {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            break;
        case 'el_fp_test.js':
            if (!ElandTracker.getFingerPrint_3_4_1) {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            break;
        default:
            document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};

ElandTracker.check = function (trackingJson, type) {
    'use strict';
    if (typeof trackingJson.retriedTimes === "undefined") {
        trackingJson.retriedTimes = 1;
    } else if (trackingJson.retriedTimes > 100) {
        if (typeof ElandTracker.cbfunc === "function") {
            ElandTracker.cbfunc();
        }
        return;
    } else {
        trackingJson.retriedTimes += 1;
    }

    if (!ElandTracker.isAllReady()) {
        ElandTracker.delay(ElandTracker.check, trackingJson);
        setTimeout(ElandTracker.ready, 100);
    } else if (type === "cf") {
        ElandTracker.ClickforceSendData(trackingJson)
    } else {
        ElandTracker.sendData(trackingJson);
    }
};

ElandTracker.trackInit = function () {
    var usefp = sessionStorage.getItem("usefp");
    if (usefp !== "0") {
        ElandTracker.useFingerprint = true;
        if (!ElandTracker.getFingerPrint_3_4_1) {
            if (!fingerPrint_3_4_1Cookie || fingerPrint_3_4_1Cookie == "") //正式會拔掉
                ElandTracker.loadjsfile("el_fp_test.min.js");
        }
        ElandTracker.loadjsfile("el_fingerprint.min.js");
    }
    ElandTracker.loadjsfile("el_util.min.js");
};

ElandTracker.startTrack = function (dataJson) {
    ElandTracker.trackInit();
    ElandTracker.check(dataJson, "el");
}

//奇怪的域動 function
ElandTracker.ClickforceTrack = function (dataJson) {
    ElandTracker.trackInit();
    ElandTracker.check(dataJson, "cf");
}

function dmpSr_view_log(dmpSr, sp_variable, memberId) {
    'use strict';
    var dataJson = {
        'source': dmpSr,
        'trackType': 'view',
        'sp_variable': sp_variable,
        'cf_uid': memberId
    };

    ElandTracker.ClickforceTrack(dataJson);
}

function dmpSr_click_log(dmpSr, sp_variable, memberId) {
    'use strict';

    var dataJson = {
        'source': dmpSr,
        'trackType': 'click',
        'sp_variable': sp_variable,
        'cf_uid': memberId
    };

    ElandTracker.ClickforceTrack(dataJson);
}

function stfpjs(newUrl, zif) {
    setTimeout(function () {
        if (typeof (ElandTracker.getFingerPrintV4) == 'function') {
            newUrl += "&fp=" + ElandTracker.getFingerPrintV4;
        }
        document.getElementById(zif).contentDocument.getElementById("cfzfsc").src = newUrl;
    }, 1200);
}

// 啟動cookie transfer接口，沒有啟動會不交換cookie接口
function cookie_mapping(target_url) {
    var t = "//dmp.eland-tech.com/dmpreceiver/cookie_transfer.jsp?target=" + target_url;
    var c = document.createElement("iframe");
    c.src = t;
    c.setAttribute('style', 'display:none');
    c.setAttribute('height', '0');
    c.setAttribute('width', '0');
    document.body.appendChild(c);
}
