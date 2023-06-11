// ==UserScript==
// @name           moneyforward-update
// @description    moneyforward auto update
// @version        0.20230611.0
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

    function formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = ('0' + (date.getMonth()+1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        const hhmmss = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        return (yyyy + '-' + mm + '-' + dd + ' ' + hhmmss);
    }

    const name = 'moneyforward-update';
    setTimeout(function() {
        console.log('[' + name + '] ' + formatDate(new Date()) + ' trigger');
        $("ul.facilities.accounts-list > li > ul > li > a:contains('更新')").trigger('click');
    }, 1000 * 3600 * 9);

    console.log('[' + name + '] ' + formatDate(new Date()));
})();
