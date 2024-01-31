// ==UserScript==
// @name           Youtube_short_mod
// @namespace      github.com/s-kono
// @description    Youtube short mod
// @version        0.20240131.0
// @grant          none
// @match          https://www.youtube.com/shorts/*
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_short_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_short_mod.user.js
// ==/UserScript==

(function() {
    'use strict';

    const def_speed = 1.5;
    const def_gain = 0.1;
    const print_title = "[YouTube_short_mod]";

    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = def_gain;
    let video, source;

    const timer_1 = setInterval(function() {
        if(document.querySelector('video') === null) {
            return;
        }
        clearInterval(timer_1);

        video = document.querySelector('video');
        source = audioCtx.createMediaElementSource(video);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;

    }, 100);

    const timer_2 = setInterval(function() {
        if(document.querySelector('div#player-container:has(ytd-shorts-player-controls)') === null) {
            return;
        }
        clearInterval(timer_2);

        const ctlbar = document.querySelector('div#player-container:has(ytd-shorts-player-controls)')
        const range = document.createElement('input');
        range.max = 2000;
        range.type = 'range';
        range.min = 0;
        range['valueAsNumber'] = 0;
        range.style = 'width:300px; height:6px; margin:auto 20px; position:fixed; z-index: 2;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 500);
            console.log(print_title, "gain.value:", gainNode.gain.value);
        };
        ctlbar.appendChild(range);

        console.log(print_title);
    }, 200);
})();
