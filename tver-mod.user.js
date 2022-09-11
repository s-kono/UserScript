// ==UserScript==
// @name           tver-mod
// @description    tver: autostart, gain x2, speed x2.1
// @version        0.202200912.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://tver.jp/episodes/*
// @grant          none
// @run-at         document-idle
// @icon           https://tver.jp/favicon.ico
// @updateURL      https://github.com/s-kono/UserScript/raw/main/tver-mod.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/tver-mod.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.slim.min.js
// ==/UserScript==

(function() {
    'use strict';
    $(function() {
      setTimeout(function() {
        $('button.vjs-big-play-button').click();
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(document.querySelector('video'));
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 2;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        setTimeout(function() {
          document.querySelector('video').playbackRate = 2.1;
        }, 1000);
      }, 1000);
    });
})();
