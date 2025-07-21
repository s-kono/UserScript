// ==UserScript==
// @name           Amazon_KindleTitle
// @description    Amazon Kindle Title
// @version        0.20250720.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://read.amazon.co.jp/*
// @grant          none
// @run-at         document-idle
// @icon           https://www.google.com/s2/favicons?sz=64&domain=www.amazon.com
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Amazon_KindleTitle.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Amazon_KindleTitle.user.js
// ==/UserScript==

(function() {
    'use strict';

    const css = `
span.noselect#readerChromeTitle {
    margin-right: 10px;
    user-select: auto;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    function toHalfWidth(val){
        return val.replace(/[！-～]/g, function(str) {
            return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
        }).replace(/”/g, '"').replace(/’/g, "'").replace(/‘/g, '`').replace(/￥/g, '\\').replace(/　/g, ' ').replace(/〜/g, '~');
    }
    function func() {
        document.querySelector('title').textContent = toHalfWidth(document.querySelector('meta[property="og:title"]').getAttribute('content'));
    }
    setTimeout(() => {
        func();
    }, 1500);
})();

