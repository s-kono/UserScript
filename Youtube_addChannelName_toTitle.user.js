// ==UserScript==
// @name           Youtube_addChannelName_toTitle
// @description    Youtube : add channelname to title
// @version        0.20220925.2
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://www.youtube.com/watch*
// @grant          none
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_addChannelName_toTitle.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.slim.min.js
// ==/UserScript==

(function() {
    'use strict';
    let pre_title = '';
    const timer = setInterval(function() {
        for(const ch_name of $('#upload-info yt-formatted-string.ytd-channel-name')) {
            const head_title = $('head > title')[0];
            const a = head_title.innerText;
            if(a == pre_title) {
                continue;
            }
            const b = String(ch_name.innerText) + ": " + String(head_title.innerText);
            if(a != b) {
                head_title.innerText = b;
                pre_title = b;
            }
            //clearInterval(timer);
        }
    }, 3000);
})();
