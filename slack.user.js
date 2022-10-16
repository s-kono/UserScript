// ==UserScript==
// @name           SlackMod
// @description    slack mod CSS for Dark Theme
// @version        0.20221016.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          https://app.slack.com/client/*
// @grant          none
// @run-at         document-idle
// @icon           data:image/png;base64,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
// @updateURL      https://github.com/s-kono/UserScript/raw/main/slack.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/slack.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.slim.min.js
// ==/UserScript==

(function() {
    'use strict';
    console.log("[SlackMod] start");

    const css = `
:root {
    --arrow-mark-color: 100 100 120;
}

div.p-channel_sidebar__channel--muted::after {
    content: "🔇";
}
div.c-message_kit__background--labels.c-message_kit__background--hovered:hover {
    background-color: #2f5519;
}
div.c-message_kit__background--hovered:hover:not(.c-message_kit__background--labels) {
    background-color: black;
}

a.msg-scroll-arrow {
    margin-left: 30rem;
    visibility: hidden;
    transition: .4s;
    position: fixed;
    z-index: 99;
    font-size: xx-large;
    text-decoration: none;
    cursor: pointer;
    color: rgb(var(--arrow-mark-color));
}
a.msg-scroll-arrow:hover {
    color: white;
}
.p-workspace__primary_view:hover a.msg-scroll-arrow {
    visibility: visible;
    transition: .3s;
}
a#msg-scroll-down {
	  top: 4rem;
  	left: -14rem;
}
a#msg-scroll-up {
  	bottom: 7.5rem;
  	left: -14rem;
}
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    function set_msgscroll_arrow() {
        if($('a#msg-scroll-down').length == 0) {
            const a_msg_down = document.createElement('a');
            a_msg_down.id = 'msg-scroll-down';
            a_msg_down.className = 'msg-scroll-arrow';
            a_msg_down.setAttribute('href', '#');
            a_msg_down.innerHTML = '&#11015;';
            $('.p-view_header').append(a_msg_down);
            $('a[id="msg-scroll-down"]').on('click', function() {
                for (const obj of $('.c-scrollbar__hider')) {
                    obj.scroll({left: 0, top: 99999999, behavior: 'smooth'});
                }
            });
        }

        if($('a#msg-scroll-up').length == 0) {
            const a_msg_up = document.createElement('a');
            a_msg_up.id = 'msg-scroll-up';
            a_msg_up.className = 'msg-scroll-arrow';
            a_msg_up.setAttribute('href', '#');
            a_msg_up.innerHTML = '&#11014;';
            $('.p-workspace__primary_view_footer').append(a_msg_up);
            $('a[id="msg-scroll-up"]').on('click', function() {
                for (const obj of $('.c-scrollbar__hider')) {
                    obj.scroll({left: 0, top: 0, behavior: 'smooth'});
                }
             });
        }
    }

    let title = '';
    function changed_title() {
        set_msgscroll_arrow();
    }

    // init
    setTimeout(function() {
        changed_title();

        const title_observer = new MutationObserver(function(mutations) {
            const new_title = document.querySelector('title').innerText;

            const now = new Date();
            console.log("[SlackMod] title_observer [" + ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2) + ":" + ('0' + now.getSeconds()).slice(-2) + '] "' + new_title + '"');

            if(title == new_title) {
                console.log("[SlackMod] title_observer: skip (title not changed)");
                return;
            }
            title = new_title;

            changed_title();
        });
        title_observer.observe(document.querySelector('title'), { childList: true, subtree: false, characterData: true, attributes: false });

        console.log("[SlackMod] init");
    }, 3000);
})();
