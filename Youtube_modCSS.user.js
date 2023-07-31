// ==UserScript==
// @name           Youtube_modCSS
// @description    Youtube : mod CSS
// @version        0.20230801.0
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
/* (非動画再生 view) 再生済位置バー */
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

/* チャットログ */
  div#content > yt-live-chat-author-chip {
      display: unset;
  }
  div#content > yt-live-chat-author-chip > span#author-name {
      white-space: nowrap;
      overflow: hidden;
  }
  div#content > span#message {
      display: table-row;
  }

  /* member */
    div#content > yt-live-chat-author-chip > span#author-name.member {
        color: #e0ff8f;
    }

  /* owner */
    div#content > yt-live-chat-author-chip > span#author-name.owner {
        background-color: red;
        color: white;
    }
    yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip > span#author-name.owner) {
        border: yellow 4px double;
        padding: 20px 0 20px 10px;
        margin: 10px 0 10px 10px;
        background: #000a8d;
    }

  /* auth? */
    div#content > yt-live-chat-author-chip[is-highlighted] > span#author-name {
        background-color: yellow;
        color: black;
    }
    yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip[is-highlighted] > span#author-name) {
        border: yellow 4px double;
        padding: 20px 0 20px 10px;
        margin: 10px 0 10px 10px;
        background: #5d00a0;
    }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
