// ==UserScript==
// @name           Amazon_urlParameterTrimming
// @description    Amazon URL Parameter Trimming
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Amazon_urlParameterTrimming.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Amazon_urlParameterTrimming.user.js
// @version        0.20240811.0
// @match          https://www.amazon.co.jp/*
// @exclude        https://www.amazon.co.jp/a/*
// @exclude        https://www.amazon.co.jp/cpe/*
// @exclude        https://www.amazon.co.jp/hz/*
// @exclude        https://www.amazon.co.jp/photos/*
// @exclude        https://www.amazon.co.jp/hz/*
// @exclude        https://www.amazon.co.jp/*/buy/*
// @exclude        https://www.amazon.co.jp/*/cart/*
// @exclude        https://www.amazon.co.jp/*/cpc/*
// @exclude        https://www.amazon.co.jp/*/css/*
// @exclude        https://www.amazon.co.jp/*/gss/*
// @exclude        https://www.amazon.co.jp/*/primecentral*
// @exclude        https://www.amazon.co.jp/*/message*
// @exclude        https://www.amazon.co.jp/*/handlers/*
// @exclude        https://www.amazon.co.jp/*account/*
// @exclude        https://www.amazon.co.jp/*handle-buy-box*
// @exclude        https://www.amazon.co.jp/*privacy*
// @exclude        https://www.amazon.co.jp/*thank-you*
// @exclude        https://www.amazon.co.jp/*thankYouPage*
// @exclude        https://www.amazon.co.jp/*wishlist/*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=www.amazon.co.jp
// @grant          none
// @run-at         document-start
// ==/UserScript==

(function() {
    const tag = "[Amazon_urlParameterTrimming]"
    const log_flag = 1;
    const o_url = location.href;
    let n_url = o_url;

    if ( log_flag > 0 ) console.log(tag, "i00:", o_url );

    //document.addEventListener ("DOMContentLoaded", main);
    main();

    function main() {
        if ( o_url.match( /^(https:\/\/www\.amazon\.co\.jp)\/(?:.*gp\/product|.*dp)\/([0-9A-Z]+)(\?m=AN1VRQENFRJN5)?/ ) ) {
            n_url = RegExp.$1 + '/dp/' + RegExp.$2 + RegExp.$3;
            if ( log_flag > 0 ) console.log(tag, "i10:", o_url, ">", n_url);
        }
        if ( o_url.match( /^(https:\/\/www\.amazon\.co\.jp\/.+)\/ref=[A-z0-9_]+$/ ) ) {
            n_url = RegExp.$1;
            if ( log_flag > 0 ) console.log(tag, "i12:", o_url, ">", n_url);
        }
        last();
    }
    function last() {
            if ( log_flag > 0 ) console.log(tag, "i90:", location.href, ">", o_url, ">", n_url);
        if ( n_url != '' && n_url != o_url ) {
            if ( log_flag > 0 ) console.log(tag, "replace");
            location.replace(n_url);
        }
    }
})();

