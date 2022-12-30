// ==UserScript==
// @name           Gmail_ModCSS
// @description    Gmail ModCSS
// @version        0.20221231.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://mail.google.com/mail/u/0/*
// @grant          none
// @run-at         document-idle
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gmail_ModCSS.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gmail_ModCSS.user.js
// ==/UserScript==

(function() {
    'use strict';
    const css = `
div.AO {
 /* mix-blend-mode: soft-light; */
    mix-blend-mode: exclusion;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
