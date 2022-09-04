// ==UserScript==
// @name           LogTest_20end
// @description    LogTest end // set start,end.idle
// @version        0.20220904.1
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          <all_urls>
// @match          *://*/*
// @grant          none
// @run-at         document-end
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @updateURL      https://github.com/s-kono/UserScript/raw/main/LogTest_20end.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/LogTest_20end.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    var name = "LogTest_end";

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
        console.log(name, ": 101 window.onload #deprecated");
    }

    document.addEventListener("DOMContentLoaded", function() {
        console.log(name, ": 100 document.addEventListener:DOMContentLoaded #may not run");
    });

        console.log(name, ": 999");
})();
