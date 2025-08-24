// ==UserScript==
// @name           LogTest_30idle
// @description    LogTest idle // set start,end.idle
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @updateURL      https://github.com/s-kono/UserScript/raw/main/LogTest_30idle.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/LogTest_30idle.user.js
// @version        0.20220904.1
// @match          <all_urls>
// @match          *://*/*
// @grant          none
// @run-at         document-idle
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    const name = "LogTest_idle";

        console.log(name, ": 000");

    $(function() {
        console.log(name, ": 204a $");
    });

    $(document).ready(function() {
        console.log(name, ": 204b $(document).ready #deprecated jQuery 3.x");
    });

    // jQuery2.X < // $(window).load(function() {
    $(window).on('load', function() {
        console.log(name, ": 203 $(window).load #may not run");
    });

    window.addEventListener("load", function() {
        console.log(name, ": 102 window.addEventListener:load #may not run");
    });

    window.onload = function() {
        console.log(name, ": 101 window.onload #deprecated #may not run");
    }

    document.addEventListener("DOMContentLoaded", function() {
        console.log(name, ": 100 document.addEventListener:DOMContentLoaded #may not run");
    });

        console.log(name, ": 999");
})();

