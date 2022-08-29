// ==UserScript==
// @name           Gmail_ModCSS
// @description    Gmail ModCSS
// @version        0.20220717.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://mail.google.com/mail/u/*
// @grant          none
// @run-at         document-end
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gmail_ModCSS.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gmail_ModCSS.user.js
// ==/UserScript==

(function() {
    'use strict';
    var css = `
table, .ajA, .iY .Bu, .ii div {
    color: #fff !important;
    background: #000 !important;
    background-color: #000 !important;
}
table.cf, .UG, .nr {
    color: #fff !important;
    background-color: #222 !important;
}
.adp, .h9, .adI, .aHn {
    background-color: #fc3 !important;
}
.gb_Se.gb_Te .gb_df {
    color: #fff !important;
}
.gb_df {
    padding: 0   0 8px 3px !important;
    margin: -5px 0 8px 3px !important;
    color: #999 !important;
}
.ig .g3, .hI .g3, .iv .g3, .hx .hb, .go, .gt a {
    color: #ba0 !important;
}
.hP, .hx, .gD, .ams, .gs div, .gs p, .gs h1, .gb_Re.gb_Se .gb_cf {
    color: #fff !important;
}
.v .fY, .fY div, .AO .aeF .nH .v9 div {
    background: #111 !important;
    color: #eee !important;
}
.Ze {
    background: #555 !important;
    background-color: #555 !important;
}
table.gstt {
    height: 30px !important;
    margin: 8px 0 0 0 !important;
}
.gb_cf:not(.gb_tf) {
    padding: 0 0 18px 5px !important;
}
    `;
    var head = document.head;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
})();
