// ==UserScript==
// @name           primevideo_mod
// @namespace      github.com/s-kono
// @description    primevideo mod
// @version        0.20230218.0
// @grant          none
// @match          https://www.amazon.co.jp/gp/video/detail/*
// @run-at         document-idle
// @icon           https://www.google.com/s2/favicons?sz=64&domain=www.amazon.co.jp
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/primevideo_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/primevideo_mod.user.js
// ==/UserScript==

(function() {
    'use strict';

    const def_speed = 2.3;
    const def_gain = 1;
    const print_title = "[primevideo_mod]";

    setInterval(function() {
        if (document.querySelector('[aria-label="Play"]')) {
            return;
        }

        const skip = document.querySelector('div.fu4rd6c.f1cw2swo');
        if (skip && skip.innerText == 'スキップ') {
            skip.click();
        }

        if(document.querySelector('input.UserScript-add-gainrange')) {
            return;
        }

        const full_screen = document.querySelector('[aria-label="Fullscreen"]');
        if (full_screen && full_screen.parentNode.innerHTML.match(/>全画面</) != null) {
            full_screen.click();
        }

      //const video = document.querySelector('video');
        const video = document.querySelectorAll('video:not(.tst-video-overlay-player-html5')[0];
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;
        let playrate;

      //const target_elem = document.querySelector('div.f3w9jrr.fcckh95');  // video title <div>
      //const target_elem = document.querySelectorAll('div.fewcsle.fcmecz0')[2]; // volume icon <div>
        const target_elem = document.querySelector('div.atvwebplayersdk-hideabletopbuttons-container.f1kg2fkb'); // 右上ボタン群(字幕・オプション・ボリューム) div, 全画面ボダン div, 区切り div 達の親 div (hide 対象)

        const parts_div = document.createElement('div');
        parts_div.className = 'primevideo_mod';
        parts_div.style = 'position: absolute; top: 15%; right: 3%;';
        target_elem.appendChild(parts_div);

        const btn_rewind30 = document.createElement('button');
        const img_rewind30 = document.createElement('img');
        img_rewind30.src = 'data:image/png;base64,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';
        btn_rewind30.appendChild(img_rewind30);
        btn_rewind30.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 30;
            setTimeout(function() {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        parts_div.appendChild(btn_rewind30);

        const btn_forward30 = document.createElement('button');
        const img_forward30 = document.createElement('img');
        img_forward30.src = 'data:image/png;base64,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';
        btn_forward30.appendChild(img_forward30);
        btn_forward30.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 30;
            setTimeout(function() {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        parts_div.appendChild(btn_forward30);

        const range = document.createElement('input');
        range.className = 'UserScript-add-gainrange';
        range.max = 900;
        range.type = 'range';
        range.min = 0;
        range['valueAsNumber'] = 0;
        //range.style = 'width:200px; height:6px; margin:auto 20px;';
        range.style = 'width:400px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 100);
            console.log(print_title, "gain.value:", gainNode.gain.value);
        };
        parts_div.appendChild(range);

        console.log(print_title);
    }, 3000);
})();
