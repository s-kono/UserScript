// ==UserScript==
// @name           kb.vmware.com_CSVmod
// @description    kb.vmware.com: fix Article margin
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/kb.vmware.com_CSVmod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/kb.vmware.com_CSVmod.user.js
// @version        0.20230417.0
// @match          https://kb.vmware.com/*
// @match          https://web.archive.org/web/*/https://kb.vmware.com/s/article/*
// @icon           https://www.google.com/s2/favicons?sz=64&domain=vmware.com
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function() {
    'use strict';
    const css = `
.cKM_ArticleThemeLayout #contentContainer {
    margin:  0 !important;
}
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();

