// ==UserScript==
// @name           Youtube_Short_mod
// @namespace      github.com/s-kono
// @description    Youtube Short mod
// @version        0.20250803.0
// @grant          none
// @match          https://www.youtube.com/shorts/*
// @run-at         document-idle
// @icon           https://www.youtube.com/s/desktop/435d54f2/img/favicon_144x144.png
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_Short_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_Short_mod.user.js
// ==/UserScript==

(function() {
    'use strict';
    const us_name = 'Youtube_Short_mod';

    const css = `
div.progress-bar-played.style-scope.ytd-progress-bar-line {
    height: 5px;
}
div#progress-bar-line.ytd-progress-bar-line {
    height: 8px;
}

button[aria-label="再生（k）"] {
    visibility: hidden;
}

.${us_name} {
  -webkit-appearance: none;
  appearance: none;
  width: 300px;
  height: 6px;
  background: transparent;
  margin: auto 20px;
  cursor: pointer;
  position: fixed;
  z-index: 2;
  top: 98%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.${us_name}::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
}
.${us_name}::-moz-range-track {
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
}
.${us_name}::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  margin-top: -5px;
}
.${us_name}::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    const def_speed = 1.8;
    const def_gain = 0.5;

    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = def_gain;
    let video, source;

    const timer_1 = setInterval(() => {
        if(document.querySelector('video') === null) {
            console.log(`[${us_name}] timer_1 video_null`);
            return;
        }
        clearInterval(timer_1);
        console.log(`[${us_name}] timer_1 clear`);

        video = document.querySelector('video');
        source = audioCtx.createMediaElementSource(video);
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;
    }, 150);

    const timer_2 = setInterval(() => {
        let target = document.querySelector('div#player-container:has(ytd-shorts-player-controls)');
        if(target === null) {
            console.log(`[${us_name}] timer_2 player_null`);
            return;
        }
        clearInterval(timer_2);
        console.log(`[${us_name}] timer_2 clear`);

        const range = document.createElement('input');
        range.classList.add(us_name);
        range.max = 2000;
        range.type = 'range';
        range.min = 0;
        range.valueAsNumber = 0;
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range.valueAsNumber / 500);
            console.log(`[${us_name}] gain.value: ${gainNode.gain.value}`);
        };
        target.appendChild(range);

        console.log(`[${us_name}] 999`);
    }, 200);
})();

