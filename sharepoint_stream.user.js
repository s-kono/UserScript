// ==UserScript==
// @name           sharepoint_stream
// @namespace      github.com/s-kono
// @description    sharepoint.com stream
// @version        0.20221123.0
// @grant          none
// @match          https://*.sharepoint.com/*/stream.aspx*
// @run-at         document-idle
// @icon           data:image/x-icon;base64,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///49+//h4MD/4eDA/+HgwP/h4MD/11ZDv+Rixf/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/6WiQv/p6ND//////+no0P+HgwP/h4MD/4eDA/+HgwP/XVkO/5GLF/+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/62qUv/p6ND/////////////////rapS/4eDA/+HgwP/h4MD/4eDA/9dWQ7/kYsX/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/h4MD/4eDA/+HgwP/h4MD/4eDA//LyZH/////////////////0tGh/56aMv+HgwP/h4MD/4eDA/+HgwP/h4MD/11ZDv+Rixf/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGs+HgwP/h4MD/4eDA/+HgwP/h4MD////////////2tiw/5aTI/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/VFEK/5GLF/+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsacIeDA/+HgwP/h4MD/4eDA/+HgwP///////////+0smL/h4MD/4eDA/+WkyP/paJC/4eDA/+HgwP/h4MD/4eDA/9GQwT/kYsX/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGt+hmxoQh4MD/4eDA/+HgwP/h4MD/4eDA//LyZH////////////w8OD/8PDg///////DwYH/h4MD/4eDA/+HgwP/h4MD/0E+Av92cQv/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxrvoZsaMAAAAACHgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+8uXH/4eDA//j37//49+//4eDA/62qUv+HgwP/h4MD/4eDA/+HgwP/QT4C/2VhA/+Cfgz/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa76GbGjAAAAAAAAAAAIeDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/9BPgL/ZWED/3BsA/95dQf/kowT/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa76GbGp+hmxoQAAAAAAAAAAAAAAAAh4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/0E+Av9lYQP/cGwD/3BsA/9wbAP/c28E/3x4Cf98eAn/hH8Mn6GbGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACHgwPPh4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/96dgP/SEUC/2VhA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWEDcGVhA/9lYQP/ZWED/2VhA/9lYQP/ZWED/2VhA/9lYQP/ZWED/2VhA/9lYQP/Z2MD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwbAMwcGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwbAO/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA0BwbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA49wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA48AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA59wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAOfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA3BwbAPvcGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAPvcGwDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsAxBwbAOAcGwDz3BsA/9wbAP/cGwD/3BsA/9wbAPPcGwDgHBsAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8A///+AH///AA///gAH//4AB//+AAf//gAAP/4AAAwAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAAHAAAAPwAAAH/4AAB/+AAAf/wAAP/8AAD//gAB//8AA///gAf//8AP/ygAAAAYAAAAMAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQxjeA0MY379DGN//Qxjf/0MY379DGN4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDGN8/Qxjf/0MY3/9DG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
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/sharepoint_stream.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/sharepoint_stream.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    const def_speed = 2;
    const def_gain = 2;

    $(function() {
      setTimeout(function() {
        // need allow autoplay(unmuted) in Browser
        $('button.vjs-big-play-button').click();

        const video = document.querySelector('video');
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        video.playbackRate = def_speed;
        let playrate;
        const ctlbar_left = document.querySelector('div.playback-controls-container');

        const btn_back = document.createElement('button');
        btn_back.style = 'margin-left:20px;';
        const img_back = document.createElement('img');
        img_back.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEs2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMzAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIzMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMzAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjItMTEtMDdUMjE6MDU6MDkrMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMDdUMjE6MDU6MDkrMDk6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS4xMC41IgogICAgICBzdEV2dDp3aGVuPSIyMDIyLTExLTA3VDIxOjA1OjA5KzA5OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7LpzqQAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kbtLA0EQh7/ESMREFLSwsDgkWkXxAaKNRYIvUIskgq/mcuYh5HHcXRCxFWwFBdHGV6F/gbaCtSAoiiCWYq1oo3LOeUJEzCyz8+1vd4bdWfAmclre9HVBvmAZsZGIMj0zq/gfCeAniI9uVTP1ifhwgor2doPHiVcdTq3K5/61wELK1MBTIzyo6YYlPCo8vmTpDm8KN2lZdUH4WDhsyAWFrx096fKTwxmXPxw2ErEoeBuElcwvTv5iLWvkheXlhPK5kvZzH+clwVRhKi6xVbwFkxgjRFAYY4gofXQzIHMfHfTQKSsq5Hd9509SlFxNZp1lDBbJkMUiLGpJqqckpkVPycix7PT/b1/NdG+PWz0YgeoH235pA/8GfK7b9vu+bX8eQNU9nBXK+cU96H8Vfb2shXahfhVOzstacgtO16D5TlcN9VuqEvem0/B8BHUz0HgJtXNuz372ObyFxIp81QVs70C7nK+f/wJKeGfZGiMy6wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqZJREFUSImtl79rVEEQxz/3IHcXBDtFU2gQ/FFYRD0sNIUQjaCi4GklWFlY2cjpH2CCBIv8A0oKEYmNphXBygPhGhNFjIVwRy6cFgqCvy56FrMvN2/c97Iv5gvL253dne/s7uzsvALhGANGgd2qDADLQBtoAHPAC+BPDr1eDACXgVdAL7B0gBtAeb2k40ArRfkXZIV14APw0zOmCVTzkl4FukrJb+AJcBzY4hlfAk4Bd4FfxoAJoOAj6bgyC0TAtJl4H9iTw+gDwLzR8dBHHnc+BW6q9gpwLQehRhGYdDr0yr3ETeCHq38HTq+TVOOYIU+cuc95rm8AaYzbJBe36u0+4nngUU6CXSnyIrCgdNeyiGPyGDuBK4gDHlHyoylztxnyg/RvSQdx4lWvtuU5sBl4b5SedMpGMozuuZVq3FN9oym7k8BiCvFaEWzB6Dmj+u5EAcSPkeikscm0h5F7eknJ9psxz5DtBqgE8ALi5XrFF0muTkPLt5q+ppO/C1mxD+Oq/jlj3IhpL7nvUAR8dVbUcxDrrf6UMe6baUe6shxbkYO4oeo6jtsdXDTt7e7bjpBHPBaWAokfmPY+971g5B9VvUz/frcj+tYXkWcvBB3Tfosc16ySLZkxJ5DEAqARIelKjPOBxAB71+i310nrngM5lw5icRcJbxYVJMbWkDsb4zD+4LHDM/+fkAmSI+mIY8NdCIZT5CXgjdJf051l+pe7hzxlG4UppTfxLMaoqgErSDr7vxgjIxHQmDTkU4RfMY2Sm5uZ+mgUkMRMO8pr4FAO0grJM01N9nzkE2ZiF5gBzgKDnjmDrm+GZFrcA26FkGpUSTqcNqIFvHSl5SGLHSl3Qh+jjLh/fM9DSsfNyfyFCd2CCMm1ziFnOET/UWmT/GmrE/DT9hcLPxx6/cUS9gAAAABJRU5ErkJggg==';
        btn_back.appendChild(img_back);
        btn_back.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 10*60;
            setTimeout(function() {
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
            video.currentTime += 10*60;
            setTimeout(function() {
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
        console.log('[sharepoint.stream]');
      }, 6000);
    });
})();