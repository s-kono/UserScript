// ==UserScript==
// @name           twitch_mod
// @namespace      github.com/s-kono
// @description    twitch mod
// @version        0.20240121.0
// @grant          none
// @match          https://www.twitch.tv/*
// @run-at         document-idle
// @icon           https://www.google.com/s2/favicons?sz=64&domain=www.twitch.tv
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/twitch_mod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/twitch_mod.user.js
// ==/UserScript==

(function() {
    'use strict';

    const css = `
div.chat-room__content > div:has(div.channel-leaderboard-header-rotating__users) {
    display: none;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    let def_speed = 1;
    const def_gain = 1.5;
    const print_title = "[twitch_mod]";

    setTimeout(() => {
        const video = document.querySelector('video');
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;
        let playrate;
        const ctlbar_left = document.querySelector('div.player-controls__left-control-group');

      if (location.href.match(/www.twitch.tv\/videos\//)) {
        def_speed = 2.2;

        const btn_rewind10 = document.createElement('button');
        btn_rewind10.style = 'margin-left:20px;';
        const img_rewind10 = document.createElement('img');
        img_rewind10.src = 'data:image/png;base64,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';
        btn_rewind10.appendChild(img_rewind10);
        btn_rewind10.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 10;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_rewind10);

        const btn_forward10 = document.createElement('button');
        btn_forward10.style = 'margin-left:5px;';
        const img_forward10 = document.createElement('img');
        img_forward10.src = 'data:image/png;base64,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';
        btn_forward10.appendChild(img_forward10);
        btn_forward10.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 10;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_forward10);

        const btn_rewind30 = document.createElement('button');
        btn_rewind30.style = 'margin-left:20px;';
        const img_rewind30 = document.createElement('img');
        img_rewind30.src = 'data:image/png;base64,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';
        btn_rewind30.appendChild(img_rewind30);
        btn_rewind30.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 30;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_rewind30);

        const btn_forward30 = document.createElement('button');
        btn_forward30.style = 'margin-left:5px;';
        const img_forward30 = document.createElement('img');
        img_forward30.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAvCAIAAAAq4N6eAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGK0lEQVRYhc2Zb0hTXxjHn7NmuVDUZvbHBUVUFjJ0i/5ZL3IuSpKIyCAkB5Ev8kXYG229iiBtBP0B0VpZKSklrGCQpBHZmyhmrAVNa0G5pSt2szmH9+5uO78Xh9/h/vb33i3j97w6O8/zfJ/PPfeeP/cOYYzh/2SyBdKdnZ2dnp7OIHEBgXQ6ndfrlZq4UEAA4HQ69+zZ4/F4JGUtIBAAuFyu6urq79+/i09ZWCAA+Pz5s06nm5qaEhm/4EAAMDExIf55+htAADA+Pn7gwAGGYdJGyrOsxHHc9PS03+/neV7Y//Pnz5hIu92u1+ufP3++bNmyVIpYuvE8PzQ0dPr06fLy8pycHEkXoNFoGIZJIS4NaG5uzmQyqVQqSRBCQwg9fPgwRQkJt+zBgwdnz56NuRdKpXL9+vXFxcWLFy8W9s/Pzz979ixGQSaT3b59u76+PlUZMQMTDAYbGhqEWRUVFVevXv306VM0Gk2Y4na7E9KkrZUe6NevXzt37qS6W7ZsGRoaSsaRDEgmk926dSttrfRAwWBwx44dVLS1tZXjODG6QiCEUHd3t5is9EAnTpwgonK5vKenR6RoDNCVK1fEJ6YC6uvro2PT29srXpQCIYRMJpOkxKRADMMUFxcTIKPRKEmUAnV0dEhNTArU1tZGaCorK3mezwDo0qVLUrOSAv3+/Ts/P5+M+evXrzPQTTsNpQGZzWYyPDU1NQkD3G732NiYx+NJ5n3z5s3k5OQfA6qtrSVAAwMDMa53795t3bqVzqDKykqbzUa9Ho9n7969dLbX1tb6fL5sgXieJ/crJyfH7/cLXX6/nzzp+/bta2lpKSsrA4CSkpLZ2VmMcSQS0Wq1AKBWqw0Gg1KpBIC6urpsgcbHx8klajSaeO+9e/fo3PF6vXK5HABGR0cxxsPDw2Qpn5+fxxjbbDaEEELI5XKJB0pwQPvy5QvdJeK9jY2Nra2tpJ2Xl7do0SIAWL58OQC8ePECAA4fPpybmwsAWq22rKwMY/z06dN4nWSWYLf3+XyksXLlymRp3d3dwWDQYrFwHHfq1KnNmzcDgMvlislatWqV0+mcmJjICigUCpEGudCEZjQaZ2ZmAODQoUMdHR2kMxgMAoBMFjvqLMsKf759+7a/vx8AdDpdXV1deiCFQiEskND6+/sDgYDVau3r69NoNHa7vbCwkJwecdy7ecyp0mazXb9+HQCKiorigRI8QyUlJaSR4h1v//79R48e7e3tVavV3759e/z4MQCsWbMGAObm5mhYIBAAgHXr1glzqSwtlAZo48aNpPHhw4cYVzgcPn/+PJ2G8O94EAiyPo2OjhIXwzAOhwMA9Hq9UITK0kL/sfiJF41GV6xYAQAIoampKaHrxo0bAFBaWtrZ2fnkyZOmpiYAkMvlTqcTY8wwTEFBAULIaDQODAzodDoA2LVrl1AhFAoVFRUBgEwmm5mZia+eeKU+duwYwe3q6hL2cxzX0NCAEKLXo1Aobt68SQMGBwfpIwgAKpXq48ePQoWRkRHi0mq1CUsnBhocHCRpFRUV8dvk+/fvOzs729vb79+/7/V6Y7xut7urq+vChQs9PT1kBRfakSNHiHJ7e7sEIJZl6XJisVgSxmRgdrudLApLliyJeRjSAGGMTSYTAVq7dm0gEMieJhwOV1VVEc2mpqZkYUmBWJbdsGEDya+vr8/4fEPt3LlzRK2wsPDHjx+SgTDGL1++JFsVALS1tWVDYzab6VS4e/duisg0bx0XL16kU6alpSUcDmdAc+3aNbqfGAyG1MFpgKLR6MmTJylTdXX1169fxaP4fL7jx4/TdL1ez7JsVkAYY57nGxsbqWhBQcHly5djDm7xxrKs2WxevXo1TaypqREzOUS920ejUZPJJNwj8/PzDQbDo0ePJicnI5EIDfN6vVartbm5mZyQiCGEzpw5EwqFxNSS8DlmbGxs27ZtEGdLly4tLS1VqVTk4BtjmzZtGh4eFl9F2vehSCRisVh2794dXzje1Gr1nTt3RA4MNYQz+mvB4XBYrdZXr145HA6yqJB+pVJZXl5eVVV18ODB7du3xx/W0lqGQELjOI7sWXl5eQqFQrj1ZmB/AOjP2l/6LCze/gF5wsaG6xMNUwAAAABJRU5ErkJggg==';
        btn_forward30.appendChild(img_forward30);
        btn_forward30.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 30;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_forward30);
      }
        const range = document.createElement('input');
        range.max = 900;
        range.type = 'range';
        range.min = 0;
        range['valueAsNumber'] = 0;
        range.style = 'width:200px; height:6px; margin:auto 20px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 100);
            console.log(print_title, "gain.value:", gainNode.gain.value);
        };
        ctlbar_left.appendChild(range);

        console.log(print_title);
    }, 2000);
})();
