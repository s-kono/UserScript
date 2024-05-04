// ==UserScript==
// @name           nicolive_mod
// @namespace      github.com/s-kono
// @description    nicolive mod
// @version        0.20230205.0
// @grant          none
// @match          https://live.nicovideo.jp/watch/lv*
// @run-at         document-idle
// @icon           https://www.google.com/s2/favicons?sz=64&domain=live.nicovideo.jp
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/nicolive_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/nicolive_mod.user.js
// ==/UserScript==

(function() {
    'use strict';

    const def_gain = 1.5;

    setTimeout(() => {
        const video = document.querySelector('video');
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        let playrate;
        const ctlbar_left = document.querySelector('div.___volume-setting___1pZPG.___volume-setting___15di1');

        const range = document.createElement('input');
        range.max = 900;
        range.type = 'range';
        range.min = 0;
        range['valueAsNumber'] = 0;
        range.style = 'width:200px; height:6px; margin:auto 20px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 100);
            console.log("[Youtube_mod] gain.value:", gainNode.gain.value);
        };
        ctlbar_left.appendChild(range);

        console.log('[nicolive_mod]');
    }, 2000);
})();
