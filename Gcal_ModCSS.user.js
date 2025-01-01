// ==UserScript==
// @name           Gcal_ModCSS
// @description    Gcal ModCSS
// @version        0.20240901.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://calendar.google.com/calendar/u/0/*
// @exclude        https://calendar.google.com/calendar/u/0/r/week
// @grant          none
// @run-at         document-idle
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gcal_ModCSS.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gcal_ModCSS.user.js
// ==/UserScript==

(function() {
    'use strict';
    const css = `
body, header, .tNDBE, .W0m3G::before, .W0m3G .r4nke, .Kk7lMc-DWWcKd-OomVLb-haAclf, .ULpymb, .J09ahd, .buGMKc, .OCQPo, .Gk2izd, .GENA3c, .iGiNKd {
    background-color: #000 !important;
}
.JtukPc, .J4VNSd {
    background-color: #111 !important;
}
.g3dbUc.smECzc.KKjvXb, .zC2ZSb {
    background-color: #444 !important;
}
.mr0WL, .MSZkRb .r4nke, .gb_na, .GXlaye .snByac, .uQ1ixe .snByac, .rSoRzd, .NI2kfb, .HLI7qf .c7fp5b, .Cd9hpd .snByac, .ULpymb .zHQkBf, .gb_na svg, .gb_Hc svg, .gb_3c .gb_5d, .gb_Sc .gb_5d, .wy3aMe, .yzYBvd, .rF3YF, div.rF3YF .NMm5M, div.rF3YF .Ce1Y1c, .SoBqBf, .OWyNBb, .W0m3G, .K2mXPb, .KSxb4d.pCcXPe, .pCoqfc, .MANBAf, .agOyMd .JAPzS, .agOyMd div.DN1TJ {
    color: #fff !important;
}
.IOneve .r4nke {
    background-color: dodgerblue;
}
.p6vobf .r4nke, .p6vobf.pWJCO .r4nke, .p6vobf.pWJCO.q2d9Ze .r4nke {
    background-color: rgb(221 26 232);
}
.RAaXne:not(.Wyo4Qe) {
    background-color: #111;
}
.wXaa9 {
    background-color: #222 !important;
}
.i8dSE .r4nke {
    color: #f0f !important;
}
.g3dbUc.UflSff {
    color: red !important;
}
.g3dbUc.qqMC3e {
    color: #000 !important;
}
.o5s4T .w48V4c {
    color: white;
}
.g3dbUc.smECzc, .g3dbUc.KCIIIb, .TgcD5e.CCDcoc .zHQkBf, .Kb2sf.CCDcoc .WpDZC, .QJLQUd, .ebs3Ne {
    color: #fff !important;
}
.EeuFAf {
    color: #53a6ff;
}
span.nHqeVd:has(span.DvyQhe.BdCDHc) {
    color: yellow !important;
}
span.nHqeVd:not(:has(span.DvyQhe.BdCDHc)) {
    color: black;
    font-weight: 600;
}
.xWId8e, .MDfQ7, .cAYGed.KKjvXb .Ioup7e, .cAYGed.KKjvXb .BMQm1d {
    background-color: #111 !important;
}
.NkK3Fc span, .gb_1c.gb_2c, .nxPHec, .O1gyfd, .MDfQ7, .shdZ7e .zHQkBf {
    color: #fff !important;
}
.VKy0Ic[aria-selected="true"] {
    background-color: #fff !important;
}
.VKy0Ic {
    background-color: #aaa !important;
}
.p9lUpf {
    background-color: #000 !important;
}
.gHQcAb, .wmCMbe {
    background-color: #111 !important;
}
.g3dbUc.smECzc:hover, .g3dbUc.KCIIIb:hover {
    background-color: red !important;
}
div.wuX2hf > div[role="columnheader"]:nth-of-type(7) > span {
    color: yellow;
    font-weight: 900;
}
div.wuX2hf > div[role="columnheader"]:nth-of-type(8) > span {
    color: red;
}
/* hover background-color */
div:has(> span.nHqeVd > span.DvyQhe.BdCDHc):hover {
    background-color: orange;
}
div:has(> span.nHqeVd > span.WBi6vc):hover {
    background-color: orange !important;
}
/* Today */
div:has(> h2.w48V4c.F262Ye) {
    background-color: #6200ee8f;
}

/* for Saturday (Starts on Monday) */
div.wuX2hf > div[role="columnheader"]:nth-of-type(7) {
    background-color: #004167;
}
div[role="presentation"] > div[role="row"] > div > div:nth-of-type(6) {
    background-color: #004167;
}
/* for Sunday (Starts on Monday) */
div.wuX2hf > div[role="columnheader"]:nth-of-type(8) {
    background-color: #830042;
}
div[role="presentation"] > div[role="row"] > div > div:nth-of-type(7) {
    background-color: #830042;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();

