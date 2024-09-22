// ==UserScript==
// @name           Youtube_modCSS
// @description    Youtube : mod CSS
// @version        0.20240921.0
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
      height: 10px !important;
  }

  ytd-rich-item-renderer:has(div.badge[aria-label="確認済み"]), ytd-rich-item-renderer:has(div.badge[aria-label="公式アーティスト チャンネル"]), ytd-compact-video-renderer:has(div.badge[aria-label="確認済み"]), ytd-compact-video-renderer:has(div.badge[aria-label="公式アーティスト チャンネル"]) {
      border: 3px solid #00bf00;
      border-radius: 15px;
      margin: 3px;
  }
  ytd-rich-item-renderer, ytd-compact-video-renderer {
      div#content:has(div.badge[aria-label="ライブ"]) {
          background-color: #549;
      }
  }
  ytd-rich-item-renderer:has(button[aria-label="通知がオンです"]), ytd-compact-video-renderer:has(button[aria-label="通知がオンです"]) {
      background-color: #4e5b29;
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

/* 再生画面 右列動画リスト */
ytd-compact-video-renderer:has(div[aria-label="メンバー限定"]) {
    /* border: 1px solid red; */
    visibility: hidden;
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
        #message.yt-live-chat-text-message-renderer {
            color: #46fff6;
        }
    }

    yt-live-chat-text-message-renderer:has(> div#content span#chip-badges > yt-live-chat-author-badge-renderer[aria-label="確認済み"]) {
        border: white 2px solid;
        border-radius: 8px;
        padding: 12px 5px 12px 10px;
        margin: 6px 0 10px 6px;
        background: #276900;
    }

    #timestamp.yt-live-chat-text-message-renderer {
        color: #fcc9ff;
    }
    .yt-simple-endpoint {
        color: greenyellow;
    }
    .yt-simple-endpoint:hover {
        color: yellow;
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

  /* for https://update.greasyfork.org/scripts/411442/Flow%20Youtube%20Chat.user.js */
    span.fyc_chat > span:has(> :nth-child(2)):not(:has(strong)) {
        border: 0.5rem solid black;
        background: #fbff47 !important;
        padding: 0 2.5%;
        > :nth-child(2) {
            margin-left: 1.5rem;
            padding: 0 2rem;
            background: #24fb86 !important;
        }
    }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();

