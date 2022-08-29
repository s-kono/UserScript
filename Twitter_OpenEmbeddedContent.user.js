// ==UserScript==
// @name           Twitter_OpenEmbeddedContent
// @description    Twitter OpenEmbeddedContent
// @version        0.20171015.5
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://twitter.com/*
// @grant          none
// @run-at         document-end
// @icon           https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7278.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Twitter_OpenEmbeddedContent.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Twitter_OpenEmbeddedContent.user.js
// ==/UserScript==

(function () {
    'use strict';
    if ( location.href.match(/^https:\/\/twitter.com\/.*\/statuse?s?\//) ) {
        var ret;
        var flag = 0;
        ret = document.evaluate('//meta[@property="og:video:url"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for ( var i=0; i < ret.snapshotLength; i++ ) {
            flag = 1;
            window.open( ret.snapshotItem(i).getAttribute('content') );
        }
        if ( flag == 1 ) {
            return;
        }
        ret = document.evaluate('//meta[@property="og:image"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for ( var i=0; i < ret.snapshotLength; i++ ) {
            if ( ret.snapshotItem(i).getAttribute('content').match( /pbs.twimg.com\/profile_images\// ) ) {
                continue;
            }
            window.open( ret.snapshotItem(i).getAttribute('content') );
        }
    }
})();
