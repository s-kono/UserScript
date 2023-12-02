// ==UserScript==
// @name           sharepoint_stream
// @namespace      github.com/s-kono
// @description    sharepoint.com stream
// @version        0.20231201.0
// @grant          none
// @match          https://*.sharepoint.com/*/stream.aspx*
// @run-at         document-idle
// @icon           data:image/x-icon;base64,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///49+//h4MD/4eDA/+HgwP/h4MD/11ZDv+Rixf/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/6WiQv/p6ND//////+no0P+HgwP/h4MD/4eDA/+HgwP/XVkO/5GLF/+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/62qUv/p6ND/////////////////rapS/4eDA/+HgwP/h4MD/4eDA/9dWQ7/kYsX/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/h4MD/4eDA/+HgwP/h4MD/4eDA//LyZH/////////////////0tGh/56aMv+HgwP/h4MD/4eDA/+HgwP/h4MD/11ZDv+Rixf/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGs+HgwP/h4MD/4eDA/+HgwP/h4MD////////////2tiw/5aTI/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/VFEK/5GLF/+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsacIeDA/+HgwP/h4MD/4eDA/+HgwP///////////+0smL/h4MD/4eDA/+WkyP/paJC/4eDA/+HgwP/h4MD/4eDA/9GQwT/kYsX/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGt+hmxoQh4MD/4eDA/+HgwP/h4MD/4eDA//LyZH////////////w8OD/8PDg///////DwYH/h4MD/4eDA/+HgwP/h4MD/0E+Av92cQv/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxrvoZsaMAAAAACHgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+8uXH/4eDA//j37//49+//4eDA/62qUv+HgwP/h4MD/4eDA/+HgwP/QT4C/2VhA/+Cfgz/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa76GbGjAAAAAAAAAAAIeDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/9BPgL/ZWED/3BsA/95dQf/kowT/6GbGv+hmxr/oZsa/6GbGv+hmxr/oZsa76GbGp+hmxoQAAAAAAAAAAAAAAAAh4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/0E+Av9lYQP/cGwD/3BsA/9wbAP/c28E/3x4Cf98eAn/hH8Mn6GbGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACHgwPPh4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/+HgwP/h4MD/4eDA/96dgP/SEUC/2VhA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWEDcGVhA/9lYQP/ZWED/2VhA/9lYQP/ZWED/2VhA/9lYQP/ZWED/2VhA/9lYQP/Z2MD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwbAMwcGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwbAO/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA0BwbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA49wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA48AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA59wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAOfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsA3BwbAPvcGwD/3BsA/9wbAP/cGwD/3BsA/9wbAP/cGwD/3BsA/9wbAPvcGwDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBsAxBwbAOAcGwDz3BsA/9wbAP/cGwD/3BsA/9wbAPPcGwDgHBsAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8A///+AH///AA///gAH//4AB//+AAf//gAAP/4AAAwAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAAHAAAAPwAAAH/4AAB/+AAAf/wAAP/8AAD//gAB//8AA///gAf//8AP/ygAAAAYAAAAMAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQxjeA0MY379DGN//Qxjf/0MY379DGN4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDGN8/Qxjf/0MY3/9DG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
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/sharepoint_stream.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/sharepoint_stream.user.js
// ==/UserScript==

(function() {
    'use strict';

    const def_speed = 2;
    const def_gain = 1;

    function set() {
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

        //

        const btn_back30s = document.createElement('button');
        btn_back30s.style = 'margin-left:20px;';
        const img_back30s = document.createElement('img');
        img_back30s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVEhLrZZZiI1hHIcHY1+zC0P2XWRfIiURpQhFliKUlOXChQsky4U12cuFlCSuLCEp24WibNnXbI1933me4/zHmePMpJn51ZP53vN+7/vfP1lFUDZMhtsw1IWSViloDYfhK/yE8VCiKgMT4R78SuJFayEHSkyG6DvEJano3TEYC1Xhv2UOesNg0BNVBw7BN0i9JBdewg/wwgvQB0pDoSoPi+EtPIYWENLaufAGvMTQTYHOsAAegeuvYDZocEaVhWWg1Z9hI1SEVFkQHnwK3DcOlOsNYR98STIL/rlMV+dBXDIfykFBqgajoEHi6a80bDl4znsYA/nUHp6CGxZC5KYo8t31YN7uQF1ISPcOgvE9AlWguLJ4roJnmoKE4V3hHWhBTxeSMmeDwF5ZDf0h1VPz0gyWgnv6Qmq1jQTPfABNXLCSrKCjEBs9cA1YsvfBivJvqyv2WMauf4AX8BFmgAYo82i5e9loFwybF033ISlzppeboBLUApvyBtSHCnAZnkBbqAmG3YtbgdKgDWD4dvnQAT6BQzLkAdthJWjpa9CzUDtoClvhGti020CDuoDS+CvJf3t4kRZa9zZayBfngF45qRfBMNgBz8Ce8d2LoMXKCz3UPgvZ9K7luNl8uNlYpktvl4BhNUeXwBwYOt+x50J67qHVE09/FGdme5GeWGGVXUnTSegHVt9Z2AJWmqH2QvMXckR5ntEImTv35frDdbCjG0OoG+yGemB5mvj9YH84DcyX07wXRJV1As+z0pTrbSBvbQUYBpMZLzm5DcVmaAQO1wPwHCwEm/wEOGaGQ0cwX7cgvk96a6UaTude1hAw1rqsB8opvgosEted2IbLeWiYlRfa/XoWxWSThiyK6DFznRg5MS6s+5i4uuyGmTAVzE14HLIpJ4CN6u8hi8VPvmfapxqekO5rlZYPcKEY0phJ4Hl6lFruCQt2ghY8BL+wRZGXjADDbUhtDSOTT9b/aTB5TgYbtLBvUrpM/jRwitg/e5NrGWWFxWW6vQdaggWQnh/lmsY4duK/YXFJDchTppf1LKaBSbTMj8MZuAla7Hu1QSMGgk2tMf62DmyZ1KlRoBxL3UEr7R09FL/AJlnLzYFreuDXWe+bwz85UZk8SpVh0Wo/avabFeSn2aJxYJ4Hy/cc3AUNyaCsrN9oSefIGhHXHwAAAABJRU5ErkJggg==';
        btn_back30s.appendChild(img_back30s);
        btn_back30s.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 30;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_back30s);
        //
        const btn_forward30s = document.createElement('button');
        btn_forward30s.style = 'margin-left:5px;';
        const img_forward30s = document.createElement('img');
        img_forward30s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANmSURBVEhLtZVpiM1RGIcvxr7vhCH7vhSRpURSjLJ8pYSyJCU++ChJJFvIWogiFGUNSQlFISRrluxj33ee5++e23/u3BnM5VdPM3Pm/M/7nnc7ib/QNLgIw6GMC/9LC+AHfIJN0BD+qUpBG9gNGgqch4GQterCODgN3yBuJODtukCJlAPD4DZ8TZIPryBu5CNshcqgysEI6ASlXShOFWAevAUPuwlToS0sTq7JIxgDFSGoD3yA5zAFiiwYPVoI3uA9rIRaEKQDhuowtHYhTdVhD3wBbzsJChnzqrPATXplKZeFuDzckFaK/sqsKrAUdPYNjIIC6gxPQEMa/G2Mi5E5Xg0W0HWoA5H0/BAY+4MQkpuN6sEV8MzlEDneHUy+HvRwISkdGACGwkLoB/GY21/NYS64x2KIR8KweeYdaOrCTPgO3ips9MAl8BnceD/5ezysvcH1d/AMLCALQAdUNbCpzddIFw6AhtwU1AFM5iow+bXhCFyDBmAbXIKH0A6sTh3VcKhIHVoBhm+Lf3iolXYDgjxgPTjf9PQleLOg9tAM1oK5sHfWgQ51A6XzDmF/9tSQHhoWDwvyw+ngrcbCbBgCG+AxNAK/vQB6rDToofGR9ABcy3Wz+XCzC+nqCHNgIuiMHpoDQ+c3NmaQN/cMGzfI/KgcDb0AK8xmS9dx6AtW3ylYA1aaodZgvHmrgucZjaCa4L58/3EVnFlNIMiS3wb14S6Y+F3gRPcdMl962wtCldn0nncu+uvXuoWSWpsPhmEjuKgGgaGwwxtDS9gHT8FCsPuPgf2XB05s82VB5YLSeSvRcDqYE4PBWFsM4dUsD4vAIWoofCIM1wwIM1CDl8Gbuc8U+MwHmV8dscf8PcqNH3gr+0Zvlbdzw2SYAOYmhCnIphwN9qD/D7JY9oJn7gcdj+T19eo1mPhspDMa9zynRoEXWA82gx7cA8dLSaSRoWC4DKmtEfKekvV/AkyeL6gf+Bj+qSz18WCuHKY7k2sZZYUFY157B7QCCyA9P8o1nekKzkybOhipASll+tibhWlgEi3zo3ASfMisTr/zQdOJ/mBT64z/Wwa2THxqFCnHkm+TD6G94w3FF9gk67k5cM0bGOrt0AIK5URlulFchkWvfdTsNyvI19OicWCeBcv3DNwCHcmgROInqivoMPyWqm8AAAAASUVORK5CYII=';
        btn_forward30s.appendChild(img_forward30s);
        btn_forward30s.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 30;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_forward30s);

        //

        const btn_back60s = document.createElement('button');
        btn_back60s.style = 'margin-left:20px;';
        const img_back60s = document.createElement('img');
        img_back60s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANySURBVEhLrZZZiI1hHIcPxr7LGkayR2TPkqVIRClCKUuSRC6QpdxwgRuF5IYbhEiuhJBSKBQ3CJMle8a+7zzPN99/HDPHpJnzq+fivO/3vf/9/U6mEiqAOXAbxruQb1WDbnAcvsJPmAl5VQ2YBffgV4qGNkMh5E2m6DuEkWyM7hRMh4bw37IGQ2AsGIlqAcfgG2QbKYaX8AM0eAWGQnWoULVhLbyFx9AZQnq7FN6ARkzdXOgDq+ARuP4KloAO51RNWA96/Rm2Q13Ilg3hwWfB52aAcr0tHIYvKYuhnDFDXQZhZDnUgn+pEUyBNsmvP9KxDeA572Ea/KWe8BR8YA1EbSoj390K1u0OtIREhncUzO8JaABVlc1zHTzTEiSO94N3oAeDXUjl5iDYCJtgRLoWsi6twQxsg+wuVZPBM+9DBxfsJDvoJERbeshq+Aim9CHYvtbOPdUDbsEneAbuazQawDra7hqb6oJp09ACf6QaAEZ5AHyhKeyGI1AH9FzHHANnzmf2wQvoD0qnjdT07XXB0D7AGH+kWgEOo61sBB7sYaZKdQTnZSdEhKPBjjVDoYVgREVa9WX73heVh3YFU+Klaep0xOiagWoHDvdF0GN1A+zavsmvEjn0ZqtQQx7sw1pWeqj3zkh3cF6c9IGwC5qA6fM5HQjpmOe4H1HGmQUaMhJvhfqupDJC870SvAVM0R7oBEYTh+pQyLHwPO++iNIMaLTYjZvgRLcHFS3pbW3OlS866T7vi+7rjC3vmuoNdtyF5FfJc2bEfbsvmRMP2gERsjPhwevAGvaCa3AVnHSf2w8amw1+EM+ANbHtVT3w82GNvPcy40DPDbmVC8hUOqQe5AzZxnbhRAj5wdP7iNx6zYOI0I51zRLoaJLbuC7s+xg4m8RbQ2/8j1D2AlWm3ItzERhJZMRm8ZPvmc6pHZpIT/Xeb81IF6ogjZlOzzMiIyuVHthVevAAnPbKSCOTwDKYUmscqSxVYzgHFu8JTICKvkllZfHnw2uwcw+laznljIQxwz4IXcDmiPxnyzWd8TaIv2FhxMEtVa6XjcyQvWQtojf4aTgPRaDHvtccdGIUDAedcW8LODIxgxXKjvPK0cvnYITiXWaR9dwauGYE3odG781RriYqV0TZMi16PQycNzvIgbVpHM7LYPtegrugIzmUyfwGf9XmOcg6ojwAAAAASUVORK5CYII=';
        btn_back60s.appendChild(img_back60s);
        btn_back60s.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 60;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_back60s);
        //
        const btn_forward60s = document.createElement('button');
        btn_forward60s.style = 'margin-left:5px;';
        const img_forward60s = document.createElement('img');
        img_forward60s.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAYAAAB/E6/TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN2SURBVEhLtdZZqK5THMfxjWOWKURxJJnKPJUhGXOBMpQbRFwQciEZypULkYgQFy5MkeFCEaKUQqFQhgzJkCTHPM98P+9+12kfZzs4m199a7/reZ7/+o9r7Zl/ofPi5Tg2VrPwf+nK+D1+jNtii/hPtUrsEA+EjQYvxWGxYG0ap8dz8WvM3WQgut1ipbQojol345cpS+LLmLvJD3F3rBu0RhwXu8SqFlakteLy+CYYezvOjR3jmukaPopTYu0YOiC+j8/i7PjLhuHRVSGC7+LG2DiGOCBVj8f2Fv6kDeLB+DlEe1Yst5lQLw4v8Uorrx5zxbiUrjP5Nb/Wi2uDs1/HCbGMdo2Pw0Y2/Nscr0BqfHNooLdik5iI54+F3D8ao7gL0WbxerB5fUwc3zsUnwf7WJhKfveNK+LqOGi6NmS+No9L44Y4IuY+lzY234utLVwQv4WoRsoYuSQ0hQ77IH4K73pGO8WboabS7rlNpY7WD0OtXsdbeCRspEuGRKmY94QPNorb46EwAjzXfV/FfuGdu+LT2CuI0yKVvjstvB/fxuF+THVhGFJTLwKGGZMq2iY+j1tiRHhIaOvzJ79mdWZMmsKuPhb2F0GMamUpOSmkjiOiG3O1ZawZjicek+Lr2j0mv2b1YcjWYhsx7GULxEPeO52dCIpqrjSKU3vDkD7vcWCIY+x4PqJUH1pkIynQ4oZtyAkg3xfFUyFFd8S2IZphlENDvmfPETSiVFubLvHgjXBmbRUkp+rGGzknHxoB7/vQc85oeWtk6HXcs5Nfs+/pTM9ftGBOGLo1xkdmguHLQg13jlfjlTCMjDi5bXZquK+eDDVhnDhvZJTEwTxzZPBcM4xbUyoNKUNmSBvrwqNjaHHwfkSuXmfEcJZznFUCf09y+1qI6qYYA6dJ9gzenBbzXd28PjHOCZGMJtAsZo7Nh0OHTsRT3vP8UAsLkM1ODvZEucwNzANdxQOp2j9WRjY5KqRLStV4pHKpXFxPh+IZUh+4DP+p3FNqZFx07v3TtXllRsZmwr4vtgvNMfI/V9Y4s3s4M50wYxODu1TzfSwyITunFNEJ/kQ8Ey4y3ek7FxonDo4DgzOeXRdGZszgCqXjHDkuwk9ChHCWKTLP1cCaCKT63nByLFcTmi+iuZIWXvsPx7zpIAOraQznC6F9n493giPzaGbmD8g25qJSdLduAAAAAElFTkSuQmCC';
        btn_forward60s.appendChild(img_forward60s);
        btn_forward60s.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 60;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_forward60s);

        //

        const btn_back10m = document.createElement('button');
        btn_back10m.style = 'margin-left:20px;';
        const img_back10m = document.createElement('img');
        img_back10m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAViSURBVEhLnVbNbxNHFJ83413HBAcn2PkwIUapieNAHIILCAo1Ra16KlKRol76D/RYqYf2UhW1t/baU6+9Vb20RULqBwXRL4ohcSrXVHyUKB/YJk6chMTr3Z3XN+uNYwNRkv4ke2bem3lv5n0usB1gMPHiYWZbR3UhL2cymYJL3hLcHbcCDCWTfcDwBBOMVb1e26VvC9tSMjw8HLANPIOIwkL+Dy4tVYm83QuyLc2VSqU8+YWl8wwh6JIckEKTM55HDlNrYE4/nJgoK3KN2wx6/JbQNW/rYZAoEcAAwAoyMLkjTgbomhENebSjJ9x6oDc8Pzc3ZzqnGrClknK5bIW7Qw9QmrncUGz88ZUf/zqXOp19NLd2j4OcJaOZABACxK6qDfu7gr2lYnF2xT3uYEfRtRnIZ+0maqdIWpiBNCzUf7o7eWPaZW+8ZCCZDHZ3dEeKxUcLtHyubTdDoVCoRPaH/zVtJQ/CHLCvO9T3qFCYeaL4ToT0JJO7hIHnLGAnE4lEi6LtFOl02sxdeOOGlJClqPBWmXWSwsajeI4Sf8UaRWABiqCZTCxWUbT/hYsXpTTKN8kOj+k1nQOHl4YUWUSjx9uEzl6iOadQ/KF85cqqYmxgTAwNMa1YLDYmII9Go3pHR4enVCop09bNS2u7M9i7iBwPUhT6ff2R+1z4ZA/xdJRwd2pyUvmjDpUj8eG7HyD3fhuLjYYVrT+R6IwPj36i+fzXNF/b9fjwkU9jozXeOrLZPws2ylnBpb/VMNo5gtwHIKXF4J67x0EymdTy8+X36I4f0fKMELIzFjvl16X4hpz7PiKL0e8FetS7rIpfj4yMBGonHUhSMIXIOVjQx4VkQWZD1fKYy+4GBysVeZ6EfcgAVARSGpDXxOrrNE+S4hxw8QqF7GsoZZpzfrwi4VXnoAsUoqQGyaCLS4a7yX4WWww0ORyAHaU/JbxuQi74AJEoYvCzvzM3b+cmb6WB8S+JBWQS5dc6TM6fSClRSNnG6RAnYahpM025sba37WOLmQdpeq1GIdHo5pWAhoyW63PdHR1oK16p7iiBeVQJssgS/MmePU0l5uHVqxXdtgvAoB5V9DpnjigbconXhMPGPgVdX/Y4JmZQ5UziMjneE6xWvS5/UyDgfTpog4R34iPHDsVHRg4R9S3Fk4z97mxyYdu6n3wFRF9UY4Eh16m8NkZHI5w8cNxj+C7RbJxufYI65C9oi+uMw8v0tD+EXblc216DFBiigVNuTHNTsllaAAePsn8TstmsJQFv0/QegDZ/586vy4LxN2n9OWleASZXJeIXJsLbtFdFUw1jY4IsFFE9x9DYLKi6FTDkBbqqj2nsu9ytW3Pu1nWoSq1+9PI6aD3mdsavFL0paAYTiQGGnrPUgAp+L7skVqjJtIe66SWwj0Iu0BXsePBUCVFoElJDlmjq14z+ZHKPsEWKpvS9AdczmfSCcxs0VnKAUKR22mUxz3FVThR9p6B65tUNPE0S/ZR/97PZtNNTnLBVRa2nK5i3URygSAivrhm7WvoPFJampy3F3w7UCzTwniVD7qPCWGoB6+d8Pq8+ODaalmo8bZ17C9SvI+SfHs2yets7Q8ulQkEl23PMtY4xEY/rUYE8RQqCSoGps+9z4+P1MvVM+x0cPLaXCfskdRpVWZHcPYecPWQenK9IudpqmpYQQluV3t0alyHaESEpKlwp8+QDDeRv9OHndMR1PKPEhYgOHYmRsENc2m1UTJXvqBaqDxZVzqhEUIIRjaswpaqwiMK+fWdiYopojVHoYDMlDiKRVIvPt9xu66zPg9DNqNhRLdJIY5X0LIKwZgzGZto1bUG1X/fYU2DsP6rMWlgDpmkVAAAAAElFTkSuQmCC';
        btn_back10m.appendChild(img_back10m);
        btn_back10m.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime -= 10*60;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_back10m);
        //
        const btn_forward10m = document.createElement('button');
        btn_forward10m.style = 'margin-left:5px;';
        const img_forward10m = document.createElement('img');
        img_forward10m.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAcCAYAAACUJBTQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVSSURBVEhLnVbdU1NHFN+ze28+NCQQEiCooDYQhEqr8atapfZj6mvH8anTt770qTOdPnb60D60/TPap87YPrU+OaPloYxjJyCgGJwygh8EDMQESAO59+72tzcXakBR+ptJdvecs3vO2fOxl9gO0HX42EHO5ClWdYYmJ0enPfJLwb3xlcC5JTnJIDP5+f7+/haP/FLsRAn5lco7iqaJyFxj4mwymfR7vG2x3XVRT8/xqDTsPaRYJyRj+nCP50IyNXVvfOS6O90Gz1XS29sbsoX/JDHaBwGfUsrmnFlSkQMalooTl4JJvrzbT79nMhnL2/pcbFGS7Dv6muASCngIh1lMiUkf5w8qFbYUiTgVHOik02nxlLFdFcasXCbzj7f1hahTkjp8LMWUcwbXwonJaXKqNyYmJlY89v+G8EaWeuPkfibtAXdBdDPbk/wrPzi45q53AHhpNjW19kQiHWuFwmN3v5tdOgZkV0/BAyGVykyOD99hly87mrdTrKzIuBT8tOG3z2HpOqGVkBL+o4xTGDky82Zv123Qts2W7bC6Gi4oUk9xcntf35FuTRMH0+kId9hpBIcqwrk6dO0a4lkHjiswcrncs4oJ3vvi8bjI5/MKa/1zUSrN2NG2/UtcOV2SVENTODQl4s3tBxDlA0rS31PjI1lP1sXAwIARbIh+jtz9siW2bzCfn13B4dFY294vGBlfM25+Eo8nDjbuab1dmJvbyLLC/KNyLJ5IcKWaOQUecUZyD25HGYymPBkXWkF+ceUzTH9AMX7IWLUNrWS34oFf4ci3itEJOJDGtXxl2OyXZPJEuLbThVSczSjOORHr4EJRM0laMwxr2RNwMb+wfAEV/R2SwcBSVyBZkj5QTL3NlLqP5H9fSnUBvDHInDGD1fPuxnUYahH/yjFkG8dBIXQ9ZzEYrE9XYmcho6u95FGwFL1aqSL6Pjs+fGPyzq0h8H+CMBKI62zagMV5WcIKISkMd0ig8FRgYaEuo3zc/oZx53Uc8IdHYopqKYkjNxTDxdpcqYA7eghZlo2zEWpmcKSFpZC/5UhkozA1xsbGyty2p5F1G/Wi99RmylcbgfWmSaqurqDA1FeMWRWBV8v6CpoqZp0lzwN0TMNiB1X0aW/vkWQf+hyMvKh5MDTjCnkoS39Ixx1WFTlX9AQb/ZYoN3r8zXBrQLtuCnYF0wmsziGONx3OboL+LvaPSB9p3n8gGcc/N6XzGG8dm9U0TmaXHp/FxESfAw1Z/HKOyYqjo6NFGPURruFHZClHPEwo+Fkw/vG9TGbB28bYpUvCVHYH5KxVQ81SIp3e1bgqL+KFCDKL/ZbNDuc80XXoTq3jZburGgiFVIvh4KCOhevtOvRzYXD2HuGWdvnZFbGSy1kt8VaOwmmXQja2xqL30So2N8etvWxmBp0Ov01IpU43CNN6B3b4yFF/jo0NF9wuXC4Xs7BlgTPeapN5XLvr7tghdD9T/soZ5HoYZXH/7t2Rh5ruHlYqleyWWNMTSUYnMqI9ulgMhALdT3Sz0/xXQSqVapC+4ABi1oGWU4Ab1+fn56uat2ExrqjSGmvKg9SJfpMwA2t7m9sTpcW5uTLYdXe+Cby7/8R+TuI8Mq1FK7B87Gr21q2NNlX3/Gp0d6djFJBvIWgJLNGtaRZJ8YAZctFeMlCzjl0SwhAlKyQNFUcpdOLjog2ySr9HXK0ObX6ytyip4ZLo6Z88hAw9xKUT1t0URGTkesVjI74DMKCbKxtduqgMOTw5OvoAtC3J8AIlNXR2DgQC0aUoWfju0taSDKOEDSXQimwqous9NpT5SMrlp7Devf+tYOxf96Y+u0GNiXIAAAAASUVORK5CYII=';
        btn_forward10m.appendChild(img_forward10m);
        btn_forward10m.addEventListener("click", (e) => {
            playrate = video.playbackRate;
            video.currentTime += 10*60;
            setTimeout(function() {
                video.playbackRate = playrate;
            }, 200);
        });
        ctlbar_left.appendChild(btn_forward10m);

        const range = document.createElement('input');
        range.max = 900;
        range.type = 'range';
        range.min = 0;
        range.valueAsNumber = 0;
        range.style = 'width:200px; height:6px; margin-left:20px;';
        range.onchange = range.oninput =e=> {
            gainNode.gain.value = def_gain + (range.valueAsNumber / 100);
            console.log("[sharepoint_stream] gain.value:", gainNode.gain.value);
        };
        ctlbar_left.appendChild(range);

        console.log('[sharepoint_stream]');
    }
    const timer = setInterval(function() {
        if(document.querySelector('video') === null) {
            return;
        }
        clearInterval(timer);
        setTimeout(function() {
            set();
        }, 300);
    }, 100);
})();
