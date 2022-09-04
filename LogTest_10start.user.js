// ==UserScript==
// @name           LogTest_10start
// @description    LogTest start
// @version        0.20220904.0
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          <all_urls>
// @match          *://*/*
// @grant          none
// @run-at         document-start
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @updateURL      https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// ==/UserScript==
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js

(function () {
    'use strict';
    var name = "LogTest_start";

        console.log(name, ": 000");

    function DOM_ContentReady() {
        console.log(name, ": 101 DOMContentLoaded");
    }

    function FullLoad() {
        console.log(name, ": 103 load");
    }

    $(document).ready(function(){
        console.log(name, ": 105 $(document).ready");
    });

    window.onload = function() {
        console.log(name, ": 107 window.onload #deprecated");
    }

    document.addEventListener("DOMContentLoaded", DOM_ContentReady);
    window.addEventListener("load", FullLoad);

        console.log(name, ": 999");
})();
