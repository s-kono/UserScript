// ==UserScript==
// @name           Youtube_addChannelName_toTitle
// @description    Youtube : add channelname to title
// @version        0.20230715.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://www.youtube.com/*
// @grant          none
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.slim.min.js
// ==/UserScript==

(function() {
    'use strict';

    let pre_title = '';
    function addChannelName() {
        console.log("[Youtube_addChannelName_toTitle] addChannelName()");
        for(const ch_name of $('#upload-info yt-formatted-string.ytd-channel-name')) {
            const head_title = $('head > title')[0];
            const a = head_title.innerText;
            if(a == pre_title) {
                continue;
            }
            console.log("[Youtube_addChannelName_toTitle] pre_title: ", pre_title);
            console.log("[Youtube_addChannelName_toTitle]         a: ", a);
            const b = String(head_title.innerText).replace(/ - YouTube$/, '') + " : " + String(ch_name.innerText) + " - YouTube";
            if(a == b) {
                continue;
            }
            console.log("[Youtube_addChannelName_toTitle]         b: ", b);
            head_title.innerText = b;
            pre_title = b;
        }
    }
    setTimeout(function() {
        const title_observer = new MutationObserver(function (mutations) {
            if (location.href.match(/\/watch/)) {
                setTimeout(function() {
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

    const css = `
ytd-thumbnail-overlay-resume-playback-renderer {
    height: 10px;
}
#progress.ytd-thumbnail-overlay-resume-playback-renderer {
    background-color: red;
    border-top: 3px solid yellow;
    border-right: 3px solid yellow;
}
ytd-thumbnail-overlay-time-status-renderer {
    margin-bottom: 10px;
    padding: 5px;
}
ytd-video-owner-renderer[watch-metadata-refresh] {
    min-width: unset;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
