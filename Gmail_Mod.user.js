// ==UserScript==
// @name           Gmail_Mod
// @description    Gmail Mod (CSS for BlackTheme) jp
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gmail_Mod.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gmail_Mod.user.js
// @version        0.20240309.0
// @match          https://mail.google.com/mail/u/0/*
// @grant          none
// @run-at         document-idle
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png
// ==/UserScript==

(function() {
    'use strict';
    const us_name = 'Gmail_Mod'

    const css = `
div.nH.bkK {
  a {
    color: #48f !important;
    text-decoration: underline !important;
  }
  h1, h2, h3, h4, h5, h6, div:not(.at,.au,.av,.hN,.hO), table, tr, td, span, center, p {
      color: #ddd !important;
      background-color: rgba(51,51,51,0.8) !important;
    font {
      color: #ddd !important;
    }
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
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    setInterval(function() {
      for(const obj of document.querySelectorAll('div.nH.bkK a')) {
        if(obj.getAttribute('data-saferedirecturl') != null) {
          console.log('[' + us_name + '] remove: ' + obj.getAttribute('data-saferedirecturl'));
          obj.removeAttribute('data-saferedirecturl');
        }
      }
      for(const font of document.querySelectorAll('div.nH.bkK font')) {
        const attr = 'color';
        if(font.hasAttribute(attr)) {
          font.removeAttribute(attr);
        }
      }
    }, 1000 * 3);

    const title_observer = new MutationObserver(function(mutations) {
        console.log('[' + us_name + '] obs title');
        setTimeout(() => {
            // 更新ボタンを遅延押下
            for(const update of document.querySelectorAll('div.nH.bkK div[role="button"][data-tooltip="更新"][aria-label="更新"]')) {
                console.log('[' + us_name + '] update.click');
                update.click();
            }
        }, 1000 * 1.5);
    });
    setTimeout(() => {
        title_observer.observe(document.querySelector('title'), { childList: true, subtree: false, characterData: true, attributes: false });
    }, 1000 * 2);
})();

