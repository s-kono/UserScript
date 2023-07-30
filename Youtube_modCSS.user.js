// ==UserScript==
// @name           Youtube_modCSS
// @description    Youtube : mod CSS
// @version        0.20230730.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://www.youtube.com/*
// @grant          none
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_modCSS.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_modCSS.user.js
// ==/UserScript==

(function() {
    'use strict';

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

div#content > yt-live-chat-author-chip {
    display: unset;
}
div#content > yt-live-chat-author-chip > span#author-name {
    white-space: nowrap;
    overflow: hidden;
}
div#content > yt-live-chat-author-chip > span#author-name.member.yt-live-chat-author-chip {
    color: #e0ff8f;
}
div#content > span#message {
    display: table-row;
}
yt-live-chat-author-chip[is-highlighted] #author-name.yt-live-chat-author-chip {
    background-color: red;
    color: white;
}
yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip[is-highlighted] #author-name.yt-live-chat-author-chip ) {
    margin: 30px 0 30px 0;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
