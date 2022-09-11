// ==UserScript==
// @name           Instagram_OpenEmbeddedContent
// @description    Instagram OpenEmbeddedContent
// @version        0.20171021.2
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://www.instagram.com/p/*
// @grant          none
// @run-at         document-idle
// @icon           https://static.cdninstagram.com/rsrc.php/v3/y9/r/uhXzVt-dlj4.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Instagram_OpenEmbeddedContent.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Instagram_OpenEmbeddedContent.user.js
// ==/UserScript==

(function () {
    'use strict';
    const img = document.evaluate('//meta[@property="og:image"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( let i=0; i < ret.snapshotLength; i++ ) {
        window.open( img.snapshotItem(i).getAttribute('content') );
    }
    const vdo = document.evaluate('//meta[@property="og:video"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for ( let i=0; i < ret.snapshotLength; i++ ) {
        window.open( vdo.snapshotItem(i).getAttribute('content') );
    }
})();
