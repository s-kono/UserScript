// ==UserScript==
// @name           Youtube_Short_mod
// @namespace      github.com/s-kono
// @description    Youtube Short mod
// @version        0.20241231.0
// @grant          none
// @match          https://www.youtube.com/shorts/*
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_Short_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_Short_mod.user.js
// ==/UserScript==

(function() {
    'use strict';

    const css = `
div.progress-bar-played.style-scope.ytd-progress-bar-line {
    height: 5px;
}
div#progress-bar-line.ytd-progress-bar-line {
    height: 8px;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    const def_speed = 1.5;
    const def_gain = 0.3;
    const print_title = "[YouTube_Short_mod]";

    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = def_gain;
    let video, source;

    const timer_1 = setInterval(() => {
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

    const timer_2 = setInterval(() => {
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

