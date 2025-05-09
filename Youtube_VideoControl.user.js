// ==UserScript==
// @name           Youtube_VideoControl
// @namespace      github.com/s-kono
// @description    Youtube VideoControl x2.3
// @version        0.20250505.0
// @grant          none
// @match          https://www.youtube.com/*
// @run-at         document-idle
// @icon           https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Youtube_VideoControl.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Youtube_VideoControl.user.js
// ==/UserScript==

(function() {
    'use strict';
    const us_name = 'Youtube_VideoControl';

    const css = `
span.ytp-time-wrapper {
  display: inline-block;
  min-width: 280px;
}

button.Youtube_VideoControl {
  background: transparent;
  border:none;
  margin: 0 0 0 3px;
  padding: 0;
  & > img {
    border-radius: 17px;
    opacity: 0.9;
  }
}
button.Youtube_VideoControl.rewind {
  margin-left: 10px;
}
button.Youtube_VideoControl.min > img {
  border: 2px solid red;
}
button.Youtube_VideoControl:hover {
  opacity: 0.5;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    let url = '';
    const def_speed = 2.3;
    const def_gain = 1;
    const print_title = '[' + us_name + '] ';
    const tooltip_path = 'div#content div#columns div#primary div#description div#tooltip';
    let video, audioCtx, source;

    function main() {
        if(document.getElementsByClassName(us_name).length > 0) {
            console.log(print_title + 'main() configured');
            if(url != location.href) {
                const video = document.querySelector('video');
                if(document.querySelector(tooltip_path) && document.querySelector(tooltip_path).innerText.match(/人が視聴中| watching now/)){
                    console.log(print_title + 'now streaming');
                    video.playbackRate = 1;
                } else {
                    video.playbackRate = def_speed;
                }
                console.log(print_title + 'reset playbackRate');
            }
            url = location.href;
            return;
        }
        console.log(print_title + 'main() AAA');

      try {
        if(!source) {
          video = document.querySelector('video');
          audioCtx = new AudioContext();
          source = audioCtx.createMediaElementSource(video);
        }
        const gainNode = audioCtx.createGain();
        //gainNode.gain.value = def_gain;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        const tooltip = document.querySelector(tooltip_path);
        if(!tooltip || !tooltip.innerText) {
            console.log(print_title + 'tooltip null');
            setTimeout(() => {
                console.log(print_title + 'call main(): tooltip null');
                main();
            }, 6000);
            return;
        }
        if(tooltip.innerText.match(/人が視聴中| watching now/)){
            console.log(print_title + 'now streaming');
            video.playbackRate = 1;
        } else {
            video.playbackRate = def_speed;
        }
        let playrate;
        const ctlbar_left = document.querySelector('div.ytp-left-controls');
        const group_ctl = document.createElement('div');
        group_ctl.classList.add(us_name);
        ctlbar_left.appendChild(group_ctl);

    // sec
        const btn_rewind20s = document.createElement('button');
        btn_rewind20s.classList.add(us_name);
        btn_rewind20s.classList.add('rewind');
        btn_rewind20s.classList.add('ten');
        btn_rewind20s.classList.add('sec');
        const img_rewind20s = document.createElement('img');
        img_rewind20s.width = '33';
        img_rewind20s.height = '33';
        img_rewind20s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_rewind20s.appendChild(img_rewind20s);
        btn_rewind20s.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 20;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_rewind20s);

        const btn_forward20s = document.createElement('button');
        btn_forward20s.classList.add(us_name);
        btn_forward20s.classList.add('forward');
        btn_forward20s.classList.add('ten');
        btn_forward20s.classList.add('sec');
        const img_forward20s = document.createElement('img');
        img_forward20s.width = '33';
        img_forward20s.height = '33';
        img_forward20s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_forward20s.appendChild(img_forward20s);
        btn_forward20s.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime += 20;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_forward20s);

        const btn_rewind60s = document.createElement('button');
        btn_rewind60s.classList.add(us_name);
        btn_rewind60s.classList.add('rewind');
        btn_rewind60s.classList.add('thirty');
        btn_rewind60s.classList.add('sec');
        const img_rewind60s = document.createElement('img');
        img_rewind60s.width = '33';
        img_rewind60s.height = '33';
        img_rewind60s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_rewind60s.appendChild(img_rewind60s);
        btn_rewind60s.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_rewind60s);

        const btn_forward60s = document.createElement('button');
        btn_forward60s.classList.add(us_name);
        btn_forward60s.classList.add('forward');
        btn_forward60s.classList.add('thirty');
        btn_forward60s.classList.add('sec');
        const img_forward60s = document.createElement('img');
        img_forward60s.width = '33';
        img_forward60s.height = '33';
        img_forward60s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_forward60s.appendChild(img_forward60s);
        btn_forward60s.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime += 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_forward60s);

    // min
        const btn_rewind5m = document.createElement('button');
        btn_rewind5m.classList.add(us_name);
        btn_rewind5m.classList.add('rewind');
        btn_rewind5m.classList.add('ten');
        btn_rewind5m.classList.add('min');
        const img_rewind5m = document.createElement('img');
        img_rewind5m.width = '33';
        img_rewind5m.height = '33';
        img_rewind5m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDEtMDVUMjE6Mzc6MTArMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDEtMDVUMjE6Mzc6MTArMDk6MDAiPgogICA8ZGM6dGl0bGU+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPjYwYjwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMS4xMC41IgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAxLTA1VDIxOjM3OjEwKzA5OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7umfjGAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kb9LQlEUxz9qUpRhUENEg4Q1WZSB1NKglAXVoAb9WvTlj8Cnj/eUkNagVSiIWvo11F9Qa9AcBEURRHOtRS0Vr/MyMCLP5Z77ud97zuHec8EeyyqqUdcPaq6gR8JBz+zcvKf+CRtOXHTgjyuGNhUdi1HT3m4kWuyq16pVO+5fa1pKGgrYGoRHFE0vCI8LT64UNIs3hduUTHxJ+FjYp8sFha8tPVHhR4vTFf6wWI9FQmBvEfakf3HiFysZXRWWl+NVs0Xl5z7WS1zJ3ExU1i6ZnRhECBPEwwSjhAgwwLD4AL346ZMdNfL7v/OnyUuuIl6jhM4yaTIU8IlalOpJWVOiJ2VkKVn9/9tXIzXor1R3BcH5YJov3VC/AZ9l03zfN83PA3Dcw1mump/fg6FX0ctVzbsL7jU4Oa9qiS04XYf2Oy2ux78lh0x7KgXPR9A8B62X0LhQ6dnPOYe3EFuVr7qA7R3okXj34hdpFGfn3m0rlgAAAAlwSFlzAAALEwAACxMBAJqcGAAABkdJREFUWIXNmXlUVHUUxz8zICBK4IIhuWOuZJBEkpWkmKFHydQSc+l4yrKyPYnTorkgacuplFMWp9Wy0hQty9wyPG6VgAdTWUTDYRQUmEZABofXHzz8vTe+ebNA5feve+/vvvv7zu/d3+/e3xuDJElcfTD+3wS04dvyELY6LGaqy7DbCO5KSDgB12Aw/B+0zhaQk0XeZkz51FY5jvoFEtqHyLuJSiIiDqOPx/ENHuWWrY5fMsjOxHzU3UeCQomZwthUOnT7F2g12tn3GRtfpeq0B9Evo00ACU+RmEJgh9ajZcpndTKmfO1Ro4+cUr5+WM5QbcJWp+0Z2IHpq4hNbg1auVl8OJ36C2oqvvQfQVQSQ8bRuRcGxYaWJGoqObqD3CwO/0CdxTFgYgoTl7pIOD1aksSWNDa8rDL6+jNqHokptO+s/3MA7A3s/ZSsBVSXqexDxvHwl7S9xita3y9h4ysqS2wyk9Pp2MM1ISVstWx/h02vcaleGPvH88xWfP08pHXoOzImCdXow7T3iJ/rGSElThxg1UQsZmG5Yw4z3tc+4bRpleaybDi2WlkNDOGx9QwY6T2nJlSZWJnEqT+EJfldRs1zj5a9gQU3cOa4rBp9eW4b/eNbyqkJF86x5GbOnRTBF+YRPsjRTaMmZn8kOAHTV7UaJ6B9Z+Ztxr+9rDZeYv2LGm6Oq3XRSmpfrOWyeussZn+iPcH5MtYudUFiVhrtgzXsv33NB1OFOn83/e7QpbV5EVkLZNkvkLRCQsK1pzy0g4wEF7TeKCckVMMuSaQPp3ifrPYZRupeVe4bHbyzM4V613NOOQGlbpfFK2EwMGWFUE/sdyyyKlqluVT+JcttAhjzvF7ok7ne0wL6DmfgKKHmZqlGVY1NzkYhDx6jdwpLEsW7ZNkYyLIifNtouAXpFuahkzm6Q0w9NtUJrdxNQo6+Ry9ipZnaE7LcLZ5OXfWcnSFqAl80n88lB7GYCW6OI16iJFF2RDwzZKxeRFORkHve5A0nICRc9awyvcRq1ZzH3iDLAUEEddGLWHpMoRjYvoaC/ZiP0D2aHpHEjSfYjUIOhEZw6pAsK8u5oKW06mzAJpzME3L2YiGbd3EQfuzHrAyiR7ru6JUTKQkYNa36tCSJot16DjUFZCSw/wcXnHRoidVqtAurUffmYanAqsjCsHhiJhHWG3Mx217H1hz9q2cYNMzF21ROZL+kRSsijtmfynJgiF4sICmDsyWcOU7PaO5Lwb+tbI+bwGu30FAOUFvE1o+57wW9OMo+R7lygla7jtw60wUb+fkujHfSeIX1IuFFfnxWVkt+dxHKWea0/q26Z6SQT+2hsVHP+fwpIf+7tNopaoOtjIZ6p561VZw4INQufYXsza3aWoXlHNZKLOcI7U7EENVodbmQO8WKtLsSh7fQ2JzmXQcS2qdltL5dzt50We5yO4t34qMIcyRbyD1i9OLkbBCyQ63z5iXGJAq5PJtf14kEyt/LfkXHMtL5HjpzTNUZRCWpRr1ZrQG30O0uTv8sq2uS2baS2KlUnOTAm8Jt8IMMiHUaZH2qOCmvvZ7eN6tGPfs0chkVp1kyipoCpw4DZzDnHaeNTWE2ryu65Ee/IWaKysHLnRjajZQtRM7WHh25hKcynXKymFk9Tai9Yxk62dHHy9VqgiRRmENxDmdLqDJx3SB6RdJ9AGG9nBbphousiFedC1feL1pKy1PYavnwAVWmj36a+9/W8PT4Jf65nfoabzhVlpJ+m2NfrrxoeEmrvoY1T/DWaOw2zwhJEoc2sDiGv3KEMaw/j6x12qq4e0AU7yNzJuVFrj0dULiHdfPFlbAJ10Xy5Pd6fYprWpfqyVrIT8uRdIuuEpKEKZ/cjeRkqT6ENCEqiYc+JyBIL4KLlC/NI3Mmpw+rjHc+TpsADedqExcvYCmjshRrhdZkRsa9RNJC1ddDj2lZK1gUTZXJRYjL8G+ntxuiJnBvGuGD3QrlYrWs5Xz2iGr7eErLYKDfCO5ZxPW3uxXELVqAJLHvc76aR93fHtDy9WdQAlFJ3Die4DAPCLlLqwmVpXwymz+3A0xYiJ9WF2WtICKOkHBCwgnuio/W9d9dSG6j0S7tXCnNbSvVVLr/kJfwuPicLaRjd+2d2Ir4T2ui+7hK/0/8B3Jnv8fqmcmMAAAAAElFTkSuQmCC';
        btn_rewind5m.appendChild(img_rewind5m);
        btn_rewind5m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 5 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_rewind5m);

        const btn_forward5m = document.createElement('button');
        btn_forward5m.classList.add(us_name);
        btn_forward5m.classList.add('forward');
        btn_forward5m.classList.add('ten');
        btn_forward5m.classList.add('min');
        const img_forward5m = document.createElement('img');
        img_forward5m.width = '33';
        img_forward5m.height = '33';
        img_forward5m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDEtMDVUMjE6Mzk6MDUrMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDEtMDVUMjE6Mzk6MDUrMDk6MDAiPgogICA8ZGM6dGl0bGU+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPjYwYjwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMS4xMC41IgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAxLTA1VDIxOjM5OjA1KzA5OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4SlwQLAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kb9LQlEUxz9qUpRhUENEg4Q1WZSB1NKglAXVoAb9WvTlj8Cnj/eUkNagVSiIWvo11F9Qa9AcBEURRHOtRS0Vr/MyMCLP5Z77ud97zuHec8EeyyqqUdcPaq6gR8JBz+zcvKf+CRtOXHTgjyuGNhUdi1HT3m4kWuyq16pVO+5fa1pKGgrYGoRHFE0vCI8LT64UNIs3hduUTHxJ+FjYp8sFha8tPVHhR4vTFf6wWI9FQmBvEfakf3HiFysZXRWWl+NVs0Xl5z7WS1zJ3ExU1i6ZnRhECBPEwwSjhAgwwLD4AL346ZMdNfL7v/OnyUuuIl6jhM4yaTIU8IlalOpJWVOiJ2VkKVn9/9tXIzXor1R3BcH5YJov3VC/AZ9l03zfN83PA3Dcw1mump/fg6FX0ctVzbsL7jU4Oa9qiS04XYf2Oy2ux78lh0x7KgXPR9A8B62X0LhQ6dnPOYe3EFuVr7qA7R3okXj34hdpFGfn3m0rlgAAAAlwSFlzAAALEwAACxMBAJqcGAAABlxJREFUWIXNmXtQVFUcxz+7ICiCILpGpGKK+SIGSkljKkatFEqy0jQ1y8qZmjEtKyItMxXpNY6aZA+ymsqcssRnhma2paglSKCJvHzA8lBgW0FZHrc/uHjubnfvsruafv/6/X7nnN/57OXce37noJMkiWtP+qsNoC5vz1NYL2A2UVdOi5XA6wkKpXM3dLqrgVVZQHYGR7ZQlkdDrX2rjx+G/kSMIyqRAaPQe7mcX+fS2rJe4Jc0jOmYjnV0SICB4ZOIT6Z77yuA1drC/i/Y9Dq1Z1zIfkmdOjN2LuOT8Ot++bDK8vhoKmV56q16L3lJeftgrqCuDOsF9Z5+3Zm+hpiplwMrJ4OPp9N43hbFm0F3EZVIZAI9+6FTvNCSRH0Nx3aTk0HuNi6Y7ROOT2LiMicLTgtLktiewg8LbYLevoyZw/gk/Htq/xyAlib2fU7GIurKbeKRCTz9NV26uYW1dSmbXrOJxEzl4VSC+zoHUsrawK6VbF5Mc6MIDorj+Z14+7iIdfh70h4Srt6LR1cT94xrQEoVH2DNRMwmEblzNjPWqn/h1LFO57A8FmuD7PoF8exGBo92n6lNtWW8n8jJP0Vk6irGzOkYVksTi26m4rjs6r2Zn8mgOE+Z2nT+LEtHcLZUJH/jCKFD7bup7InGTwQTMH3NZWMC/HsyZwu+/rLb2szGV1S62T+tixaSw7FUye7tM5n1mfoE58r5ZpkTiJkp+AeqxA9t4MMpwn15LzfdqYm15U0yFsm2jx8pJwgKVZ/y8G7SxjrBereKIINKXJJIjaVov+z2H0nyPpu1r7frbUwX7j3zHTIBpzu8Lf5XOh2T3hFucZb9JmuDdTqHmlOy3akz976olbo0x30sIDyWIWOEm5Nh02pT2GRvEvawe7W+wpJE0R7Z1vuxvBDvTirdAjQ35lsf5thuMXV8sgOsnM3Cjn5AK2ONiYZi2e4dR4/rtTo7UtQEvmz/PpccxGwisD2P+CNKEuX5YkxkvFbGskJhh93iDhMQFGozVrm8xNOqP0dLk2x3DiCgl1bG038rHB27vqIgC1M+faLpG8Go+wnswEYOGAZw8rBsK7dzgaWMaryAbSo9ImzjEmGb9nAQdtzEzDSiRzuv6JUTKQH0qlFtLEmicK9Wh/oC0saStc0JkwaWeFqtLSKq1zx5mKuxKFZhSBzDHyLkRkxFZL6FtT37+ucZOtLJX1M5UUuzGlag4m1Slh+qSkyjsoSK44RFMzkJ3y5yfNQEFt9GUxVAQyE71zH5Ja08lipRcgX3EXGx+ZgrmN9O1jWYleeckDnSxhXseEG2B04maYM7ScTaCjCI+rq+hosWN7HCIoR98jdaWz3D0nthGCAa8n9yE6urYm+wltPU6LhrR7CAyARhKzciO1lqOXOCYwfI2kZRrn1rXZWwe8SIZeeSbF656AfIXCHbuVtptqofAb59m32pst3rDpb8jJciTb5R2H2Hu8OE3dMKv10csxrqMH6sPmb4eGFXGfn1O7GA8vaRpahYRj/mJpZ9Gbj+OXavlu0AAymFKnWEtZGUCZxRLL5escRMobqUA++J4LDHmfepm1c39ljmCl4Np7FedhNeZaJaZVx9hqVjqC9wmHfIDGavdFLYaMj+iBEYYlP9bU8lf6fKMENvkrYTMUs96eilzE13nwnVA1njeZLD+adSdrsEsiCLkMEqgyWJE9kUZVNZQm0ZNwylXwR9BhPSz9NrN/Xj61/bWXUfl1oM/Zn3I9cN9Ggml6R+d3pzvM0RoLqYZTEczXRzjtI/xHnVIyzg7heIfUK4DXWsGMfWJQ7vrjRUlscbkRjT6fjFo0MsnY4Zaxk5TUSkVja9zoKBGNNpbXY0Tl0XLXz+FKvvd16byLNrX7tJEjvfYeMr9j80uA9RiUQlMuguvNTOPEr9/hnr2h9812Cmf8CIyZ5htSl3G5/MULlRBnz96RFGNwOWszbnPqXKj9qvy5gpTFtD12DPsID6GnaksmuVzdWZJxrxCLPXO/yOuHYBXnOKzYs5uN6dhX9J3r48uIyx87SuT13DapO1gaOZZGeQuxVLtWtjw27hyS8IHeakmztYlyRJ/FOJ2UR1MX98y40j1LuVHuLgBvRe3LeQhAXOX5G21Fdcv62TFg6RSg65MMSjp9VBnS2hWwg+rpSp/weWG7pG/5/4L9Kp0HGbZFsVAAAAAElFTkSuQmCC';
        btn_forward5m.appendChild(img_forward5m);
        btn_forward5m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime += 5 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_forward5m);

        const btn_rewind20m = document.createElement('button');
        btn_rewind20m.classList.add(us_name);
        btn_rewind20m.classList.add('rewind');
        btn_rewind20m.classList.add('thirty');
        btn_rewind20m.classList.add('min');
        const img_rewind20m = document.createElement('img');
        img_rewind20m.width = '33';
        img_rewind20m.height = '33';
        img_rewind20m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_rewind20m.appendChild(img_rewind20m);
        btn_rewind20m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 20 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_rewind20m);

        const btn_forward20m = document.createElement('button');
        btn_forward20m.classList.add(us_name);
        btn_forward20m.classList.add('forward');
        btn_forward20m.classList.add('thirty');
        btn_forward20m.classList.add('min');
        const img_forward20m = document.createElement('img');
        img_forward20m.width = '33';
        img_forward20m.height = '33';
        img_forward20m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_forward20m.appendChild(img_forward20m);
        btn_forward20m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime += 20 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_forward20m);

        const btn_rewind60m = document.createElement('button');
        btn_rewind60m.classList.add(us_name);
        btn_rewind60m.classList.add('rewind');
        btn_rewind60m.classList.add('thirty');
        btn_rewind60m.classList.add('min');
        const img_rewind60m = document.createElement('img');
        img_rewind60m.width = '33';
        img_rewind60m.height = '33';
        img_rewind60m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_rewind60m.appendChild(img_rewind60m);
        btn_rewind60m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 60 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_rewind60m);

        const btn_forward60m = document.createElement('button');
        btn_forward60m.classList.add(us_name);
        btn_forward60m.classList.add('forward');
        btn_forward60m.classList.add('thirty');
        btn_forward60m.classList.add('min');
        const img_forward60m = document.createElement('img');
        img_forward60m.width = '33';
        img_forward60m.height = '33';
        img_forward60m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAFSWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjUwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNTAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI1MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNTAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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';
        btn_forward60m.appendChild(img_forward60m);
        btn_forward60m.addEventListener('click', (e) => {
            playrate = video.playbackRate;
            video.currentTime += 60 * 60;
            setTimeout(() => {
                video.playbackRate = playrate;
                console.log(print_title, "playbackRate:", video.playbackRate);
            }, 1500);
        });
        group_ctl.appendChild(btn_forward60m);

        const range = document.createElement('input');
        range.classList.add(us_name);
/*
        range.addEventListener('wheel', (e) => {
            if (e.deltaY < 0){
                range.valueAsNumber += 1;
            } else {
                range.valueAsNumber -= 1;
            }
            e.preventDefault();
            e.stopPropagation();
        })
*/
        range.max = 300;
        range.type = 'range';
        range.min = -100;
        range['valueAsNumber'] = 0;
        range.style = 'width:200px; height:6px; margin:auto 10px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range['valueAsNumber'] / 100);
            console.log(print_title, "gain.value:", gainNode.gain.value);
        };
        group_ctl.appendChild(range);

      } catch(e) {
        console.log(print_title + 'main() error:', e);
      }

        console.log(print_title + 'main() end');
    }

    const obs_config = { childList: true, subtree: false, characterData: false, attributes: false };
    setTimeout(() => {
        const title_observer = new MutationObserver(function(mutations) {
            if(location.href.match(/\/watch/)) {
                setTimeout(() => {
                    console.log(print_title + 'main() run from title_observer');
                    main();
                }, 1500);
            }
        });
        title_observer.observe(document.querySelector('title'), obs_config);
        if(location.href.match(/\/watch/)) {
            console.log(print_title + 'main() run init');
            main();
        }
    }, 2000);
})();

