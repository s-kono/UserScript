// ==UserScript==
// @name           moneyforward-update
// @description    moneyforward auto update
// @version        0.202201121.0
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
    $(function() {
      //setTimeout(function() {
      //    console.log('[moneyforward-update] init update');
      //    $("ul.facilities.accounts-list > li > ul > li > a:contains('更新')").trigger('click');
      //}, 3000);
      //setInterval(function() {
      //    console.log('[moneyforward-update] loop update');
      //    $("ul.facilities.accounts-list > li > ul > li > a:contains('更新')").trigger('click');
      //}, 43200000);
        setTimeout(function() {
            console.log('[moneyforward-update] update');
            $("ul.facilities.accounts-list > li > ul > li > a:contains('更新')").trigger('click');
        }, 32400000);
    });
    console.log('[moneyforward-update]');
})();
