// ==UserScript==
// @name           Youtube_addChannelName_toTitle
// @description    Youtube : add channelname to title
// @version        0.20240811.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://www.youtube.com/*
// @grant          none
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// ==/UserScript==

(function() {
    'use strict';

    let pre_title = '';
    function addChannelName() {
        console.log("[Youtube_addChannelName_toTitle] addChannelName()");
        for(const chname of document.querySelectorAll('div#columns div#upload-info ytd-channel-name#channel-name yt-formatted-string a')) {
            const chname_string = chname.textContent;
            const head_title = document.querySelector('head > title');
            const a_string = head_title.innerText;
            if(a_string == pre_title) {
                return;
            }
            console.log("[Youtube_addChannelName_toTitle] pre_title: ", pre_title);
            console.log("[Youtube_addChannelName_toTitle]         a: ", a_string);
            const b_string = String(head_title.innerText).replace(/ - YouTube$/, '') + " : " + String(chname_string) + " - YouTube";
            if(a_string == b_string) {
                return;
            }
            console.log("[Youtube_addChannelName_toTitle]         b: ", b_string);
            head_title.innerText = b_string;
            pre_title = b_string;
        }
    }
    setTimeout(() => {
        const title_observer = new MutationObserver(function(mutations) {
            if (location.href.match(/\/watch/)) {
                setTimeout(() => {
                    // title_observer.disconnect();
                    addChannelName();
                    // title_observer.observe(document.querySelector('title'), { childList: true, subtree: false, characterData: false, attributes: false });
                }, 5000);
            }
        });
        title_observer.observe(document.querySelector('title'), { childList: true, subtree: false, characterData: false, attributes: false });
        if (location.href.match(/\/watch/)) {
            addChannelName();
        }
    }, 4000);
})();

