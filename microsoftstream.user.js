// ==UserScript==
// @name           microsoftstream
// @namespace      github.com/s-kono
// @description    web.microsoftstream.com video
// @version        0.20221109.0
// @grant          none
// @match          https://web.microsoftstream.com/video/*
// @run-at         document-idle
// @icon           https://web.microsoftstream.com/favicon.ico
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/microsoftstream.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/microsoftstream.user.js
// ==/UserScript==

(function() {
    'use strict';

    const def_speed = 2;
    const def_gain = 2;

    const css = `
div.row {
    max-width: none;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    $(function() {
      setTimeout(() => {
        // need allow autoplay(unmuted) in Browser
        $('button.vjs-big-play-button').click();

        $('button.amp-theater-icon.vjs-control.vjs-button').click();
        const video = document.querySelector('video');
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;
        let playrate;
        const ctlbar_left = document.querySelector('div.amp-controlbaricons-left');

        const btn_back = document.createElement('button');
        btn_back.style = 'margin-left:20px;';
        const img_back = document.createElement('img');
        img_back.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEs2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMzAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjItMTEtMDdUMjE6MDU6MDkrMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMDdUMjE6MDU6MDkrMDk6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS4xMC41IgogICAgICBzdEV2dDp3aGVuPSIyMDIyLTExLTA3VDIxOjA1OjA5KzA5OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7LpzqQAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kbtLA0EQh7/ESMREFLSwsDgkWkXxAaKNRYIvUIskgq/mcuYh5HHcXRCxFWwFBdHGV6F/gbaCtSAoiiCWYq1oo3LOeUJEzCyz8+1vd4bdWfAmclre9HVBvmAZsZGIMj0zq/gfCeAniI9uVTP1ifhwgor2doPHiVcdTq3K5/61wELK1MBTIzyo6YYlPCo8vmTpDm8KN2lZdUH4WDhsyAWFrx096fKTwxmXPxw2ErEoeBuElcwvTv5iLWvkheXlhPK5kvZzH+clwVRhKi6xVbwFkxgjRFAYY4gofXQzIHMfHfTQKSsq5Hd9509SlFxNZp1lDBbJkMUiLGpJqqckpkVPycix7PT/b1/NdG+PWz0YgeoH235pA/8GfK7b9vu+bX8eQNU9nBXK+cU96H8Vfb2shXahfhVOzstacgtO16D5TlcN9VuqEvem0/B8BHUz0HgJtXNuz372ObyFxIp81QVs70C7nK+f/wJKeGfZGiMy6wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqZJREFUSImtl79rVEEQxz/3IHcXBDtFU2gQ/FFYRD0sNIUQjaCi4GklWFlY2cjpH2CCBIv8A0oKEYmNphXBygPhGhNFjIVwRy6cFgqCvy56FrMvN2/c97Iv5gvL253dne/s7uzsvALhGANGgd2qDADLQBtoAHPAC+BPDr1eDACXgVdAL7B0gBtAeb2k40ArRfkXZIV14APw0zOmCVTzkl4FukrJb+AJcBzY4hlfAk4Bd4FfxoAJoOAj6bgyC0TAtJl4H9iTw+gDwLzR8dBHHnc+BW6q9gpwLQehRhGYdDr0yr3ETeCHq38HTq+TVOOYIU+cuc95rm8AaYzbJBe36u0+4nngUU6CXSnyIrCgdNeyiGPyGDuBK4gDHlHyoylztxnyg/RvSQdx4lWvtuU5sBl4b5SedMpGMozuuZVq3FN9oym7k8BiCvFaEWzB6Dmj+u5EAcSPkeikscm0h5F7eknJ9psxz5DtBqgE8ALi5XrFF0muTkPLt5q+ppO/C1mxD+Oq/jlj3IhpL7nvUAR8dVbUcxDrrf6UMe6baUe6shxbkYO4oeo6jtsdXDTt7e7bjpBHPBaWAokfmPY+971g5B9VvUz/frcj+tYXkWcvBB3Tfosc16ySLZkxJ5DEAqARIelKjPOBxAB71+i310nrngM5lw5icRcJbxYVJMbWkDsb4zD+4LHDM/+fkAmSI+mIY8NdCIZT5CXgjdJf051l+pe7hzxlG4UppTfxLMaoqgErSDr7vxgjIxHQmDTkU4RfMY2Sm5uZ+mgUkMRMO8pr4FAO0grJM01N9nzkE2ZiF5gBzgKDnjmDrm+GZFrcA26FkGpUSTqcNqIFvHSl5SGLHSl3Qh+jjLh/fM9DSsfNyfyFCd2CCMm1ziFnOET/UWmT/GmrE/DT9hcLPxx6/cUS9gAAAABJRU5ErkJggg==';
        btn_back.appendChild(img_back);
        btn_back.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 10;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log("[microsoftstream] playbackRate:", video.playbackRate);
            }, 750);
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log("[microsoftstream] playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_back);
        const btn_forward = document.createElement('button');
        btn_forward.style = 'margin-left:5px;';
        const img_forward = document.createElement('img');
        img_forward.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEs2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMzAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjItMTEtMDdUMjE6MDQ6MjMrMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMDdUMjE6MDQ6MjMrMDk6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS4xMC41IgogICAgICBzdEV2dDp3aGVuPSIyMDIyLTExLTA3VDIxOjA0OjIzKzA5OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz5vvwx0AAABgGlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz9maMSIYmFh8RJWRowSG4uRX4XFGGWwefPMDzVv5vXemyRbZasosfFrwV/AVlkrRaRkKWtig57zZqZmkjm3c8/nfu89p3vPBU8krelWdS/oGdsMj4eU+eiC4nuhHh9+vHSpmmVMz45FqGif91S58Tbg1qp87l+rX45bGlTVCg9rhmkLTwhPrdqGyzvCLVpKXRY+E+425YLCd64eK/Cry8kCf7tsRsIj4GkSVpJlHCtjLWXqwvJyOvR0Tivex32JP56Zm5XYLt6GRZhxQihMMsoIA/QxJPMAAYL0yIoK+b35/BmykqvJbLCGyQpJUth0i5qT6nGJCdHjMtKsuf3/21cr0R8sVPeHoObZcd47wbcNP1uO83XkOD/H4H2Cy0wpP3sIgx+ib5W0jgNo3IDzq5IW24WLTWh9NFRTzUtecU8iAW+n0BCF5huoWyz0rLjPyQNE1uWrrmFvH7rkfOPSLzAqZ80/jJmtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACo0lEQVRIia2Xv2sUQRTHP7foeSBYBpNCDwtNoZCYYGEQ/IUW/kJPK7GzsFZy/4AmWuUvUKzUxEKJnaCdRIQLBo0IsVBPPD0tRAUDOfUs3uztu+fs3u6SLww782be9zv7ZvbNbIF0CIAx4AQwCgwA/UALeKPKE+BxSs5ElIAq0ATaKcsCcA5Ym1e0AtQ9xCvAe+ApMA98j5nAB+BQFsECMGFIWsAN4AgSBYs+J/IA+Gv8LqQVnTaiL4GdGSY+CNw2HFPIPplGlq1pnfSb/gYmgWIGUY2LwB/FVwUeqnYHFSO6L6egxnFg2XEuA++scInujTSxCqIhqvg333+dL8gX3i0e213gVZxwQPSdrgDDHoLNwHlgBtit7GMxpBtd/0JMfxtgj2pcN4IbkIykHQ67vqEE0jYStUfAZ19Zg6TBEPeM8A/Uehg8j7GHmAd2xHUGSO4FCbMvz94H3hrbetMuIzngrLJt7zExlpC3suQal+gO9RnMeiloe18cYYCcMgCfes1QQefgbwnjhpKE80CH+mvCuF+mPYdE4mdA9KYDGYRrqr5V1e2LLJl2qNEIgIZr9OM/eXy4ZdqD7nna2L+o+jqiZW0ERLMvAgdSCtvT5TUSwhll+2jGHCTKiLUAmFWdp1IKA2zr0W8/p5OqPgvdKbMFjHhIRoFxV8rKvgt/1tpk/Icdd9tpdfaCPiQWyXdIlGPsReQyEfKP6057LF7NIRyHScVbx7OB7UVg/yqI7nVcIW8lbqC9+lxDPoOsKCJR06JXkhwKwB26N8oi0UGSBiN0r2nbcRZ6ORbc7Oz19iZwDH+SKQFHkStwy/heTiOqkXShrwPPkEt93dnsuDoJa9oLJWT7Z/mFaTqfxPSbNgQBctfSP22dhO9KDclIc8jfRCL+AS1aEWgHtQihAAAAAElFTkSuQmCC';
        btn_forward.appendChild(img_forward);
        btn_forward.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 10;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log("[microsoftstream] playbackRate:", video.playbackRate);
            }, 750);
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log("[microsoftstream] playbackRate:", video.playbackRate);
            }, 1500);
        });
        ctlbar_left.appendChild(btn_forward);

        const range = document.createElement('input');
        range.max = 900;
        range.type = 'range';
        range.min = 0;
        range['valueAsNumber'] = 0;
        range.style = 'width:200px; height:6px; margin-left:20px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 100);
            console.log("[microsoftstream] gain.value:", gainNode.gain.value);
        };
        ctlbar_left.appendChild(range);
      }, 6000);
    });
})();

