// ==UserScript==
// @name           LogTest_10start
// @description    LogTest start // set start,end.idle
// @version        0.20220904.1
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          <all_urls>
// @match          *://*/*
// @grant          none
// @run-at         document-start
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @updateURL      https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    var name = "LogTest_start";

        console.log(name, ": 000");

    $(function() {
        console.log(name, ": 204a $");
    });

    $(document).ready(function() {
        console.log(name, ": 204b $(document).ready #deprecated jQuery 3.x");
    });

    // jQuery2.X < // $(window).load(function() {
    $(window).on('load', function() {
        console.log(name, ": 203 $(window).load");
    });

    window.addEventListener("load", function() {
        console.log(name, ": 102 window.addEventListener:load");
    });

    window.onload = function() {
        console.log(name, ": 101 window.onload #deprecated #may not run");
    }

    document.addEventListener("DOMContentLoaded", function() {
        console.log(name, ": 100 document.addEventListener:DOMContentLoaded");
    });

        console.log(name, ": 999");
})();
