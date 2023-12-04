// ==UserScript==
// @name           moneyforward-update
// @description    moneyforward auto update
// @version        0.20231203.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://moneyforward.com/
// @grant          none
// @run-at         document-idle
// @icon           https://assets.moneyforward.com/assets/favicon-710b014dd04a85070bb0a55fa894b599015b5310333d38da9c85ad03594bbc20.ico
// @updateURL      https://github.com/s-kono/UserScript/raw/main/moneyforward-update.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/moneyforward-update.user.js
// ==/UserScript==

(function() {
    'use strict';
    const name = 'moneyforward-update';

    function formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = ('0' + (date.getMonth()+1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        const hhmmss = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        return (yyyy + '-' + mm + '-' + dd + ' ' + hhmmss);
    }

  //setInterval(function() {
    setTimeout(function() {
        console.log('[' + name + '] ' + formatDate(new Date()) + ' trigger');
        for(const obj of document.querySelectorAll('ul.facilities.accounts-list > li.account')) {
            const target = obj.querySelector('div.heading-accounts > a').innerText;
            if(obj.querySelector('ul > li.controls > a[data-method="post"]').innerText != "更新") {
                console.log('[' + name + '] ' + String(target) + ' SKIP');
                continue;
            }
            console.log('[' + name + '] ' + String(target) + ' update');
            obj.querySelector('ul > li.controls > a[data-method="post"]').click();
        }
    }, 1000 * 3600 * 9);

    console.log('[' + name + '] set ' + formatDate(new Date()));
})();
