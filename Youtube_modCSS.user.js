// ==UserScript==
// @name           Youtube_modCSS
// @description    Youtube : mod CSS
// @version        0.20231112.0
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
  .ytp-progress-bar-container {
      height: 10px;
  }

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
        padding: 0px 6px 0px 6px;
    }

    yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip[is-highlighted] > span#author-name.owner) {
        border: yellow 4px double;
        border-radius: 8px;
        padding: 12px 5px 12px 10px;
        margin: 6px 0 10px 6px;
        background: #000877 !important;
    }

    yt-live-chat-text-message-renderer:has(> div#content span#chip-badges > yt-live-chat-author-badge-renderer[aria-label="確認済み"]) {
        border: white 2px solid;
        border-radius: 8px;
        padding: 12px 5px 12px 10px;
        margin: 6px 0 10px 6px;
        background: #276900;
    }

  /* auth? */
    div#content > yt-live-chat-author-chip[is-highlighted]:not(:has(> span#author-name.owner)) > span#author-name {
        background-color: yellow;
        color: black;
        padding: 0px 6px 0px 6px;
    }

  /* moderator */
    div#content > yt-live-chat-author-chip > span#author-name.moderator {
        background-color: white;
        color: var(--yt-live-chat-moderator-color);
        padding: 0px 6px 0px 6px;
    }
    yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip > span#author-name.moderator) {
        border: white 2px solid;
        border-radius: 8px;
        padding: 12px 5px 12px 10px;
        margin: 6px 0 10px 6px;
        background: #5813b1 !important;
    }

  /*
    yt-live-chat-text-message-renderer:has(> div#content > yt-live-chat-author-chip[is-highlighted]:not(:has(> span#author-name.owner)) > span#author-name) {
        border: white 2px solid;
        border-radius: 8px;
        padding: 12px 5px 12px 10px;
        margin: 6px 0 10px 6px;
        background: #5d00a0;
    }
  */

    ytd-watch-flexy[flexy][js-panel-height_] #chat.ytd-watch-flexy:not([collapsed]) {
        height: 800px;
    }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
