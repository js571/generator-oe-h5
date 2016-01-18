(function(win) {
    var doc = win.document;
    var matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    var isIos = navigator.appVersion.match(/iphone|ipad/gi);
    var dpr = win.devicePixelRatio || 1;
    var docEl = doc.documentElement;
    var baseRate = 0.15625;
    var isQiPa = false;

    /* #* matches[1] > 534代表是Android4.4以上系统; *# */
    var content = '';
    if (isIos) {
        // IOS不需要做任何事情,
    } else if (matches && matches[1] > 534) {
        /* #* 安卓4.4以上, 有的webview支持target-densitydpi=device-dpi, 有的支持scale, 但不会同时支持, 所以两个都写上. *# */
        content += 'target-densitydpi=device-dpi,';
        isQiPa = true;
    } else {
        /* #* 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现. *# */
        dpr = 1;
    }
    var scale = 1 / dpr;
    content += 'width=device-width,user-scalable=no,initial-scale=' + 1 + ',maximum-scale=' + 1 + ',minimum-scale=' + 1;
    doc.querySelector('meta[name="viewport"]').setAttribute('content', content);
    /* #* width/640*100, 为了统一rem为0.01rem = 1px *# */
    docEl.style.fontSize = baseRate * getClientWidth() + 'px';
    win.addEventListener('resize', function() {
        docEl.style.fontSize = baseRate * getClientWidth() + 'px';
    });
    win.addEventListener('load', function() {
        docEl.style.fontSize = baseRate * getClientWidth() + 'px';
    });

    function getClientWidth() {
        if( isQiPa ){
            return docEl.clientWidth;
        }else{
           return docEl.clientWidth > 640 ? 640 : docEl.clientWidth; 
        }
        
    }
})(window);