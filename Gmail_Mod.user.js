// ==UserScript==
// @name           Gmail_Mod
// @description    Gmail Mod (CSS for BlackTheme)
// @version        0.20240211.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://mail.google.com/mail/u/0/*
// @grant          none
// @run-at         document-idle
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gmail_Mod.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gmail_Mod.user.js
// ==/UserScript==

(function() {
    'use strict';
    const css = `
div.nH.bkK {
  a {
    color: #48f !important;
    text-decoration: underline !important;
  }
  h1, h2, h3, h4, h5, h6, div:not(.at,.au,.av,.hN,.hO), table, tr, td, span, center, p {
    color: #ddd !important;
    background-color: rgba(51,51,51,0.8) !important;
  }
  div.at, div.au, div.av, div.hN, div.hO {
    font-weight: 500;
  }
  .zF, .bqe, .bq3 {
    color: #9f8 !important;
  }
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    setInterval(function() {
      for(const obj of document.querySelectorAll('div.nH.bkK a')) {
        if(obj.getAttribute('data-saferedirecturl') != null) {
          console.log('[Gmail_ModCSS] remove: ' + obj.getAttribute('data-saferedirecturl'))
          obj.removeAttribute('data-saferedirecturl');
        }
      }
      for(const font of document.querySelectorAll('div.nH.bkK font')) {
        const attr = 'color';
        if(font.hasAttribute(attr)) {
          font.removeAttribute(attr);
        }
      }
    }, 3000);
})();
