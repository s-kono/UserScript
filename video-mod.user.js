// ==UserScript==
// @name           video-mod
// @description    autostart, gain x2, speed x2.1 : tver, abema
// @version        0.20241231.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://tver.jp/episodes/*
// @match          https://abema.tv/video/episode/*
// @grant          none
// @run-at         document-idle
// @icon           https://tver.jp/favicon.ico
// @updateURL      https://github.com/s-kono/UserScript/raw/main/video-mod.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/video-mod.user.js
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        document.querySelector('button.vjs-big-play-button').click();
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(document.querySelector('video'));
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 2;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        setTimeout(() => {
            document.querySelector('video').playbackRate = 2.1;
        }, 1000);
    }, 3000);
})();

