// ==UserScript==
// @name           LogTest_10start
// @description    LogTest start
// @version        0.20180513.1
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          <all_urls>
// @grant          none
// @run-at         document-start
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @updateURL      https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/LogTest_10start.user.js
// ==/UserScript==

(function () {
    'use strict';
    var name = "LogTest_start";

        console.log (name, ": 000");

    function DOM_ContentReady () {
        console.log (name, ": 200");
    }

    function FullLoad () {
        console.log (name, ": 201");
    }

    document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
    window.addEventListener ("load", FullLoad);

        console.log (name, ": 100");
        console.log (name, ": 101");
})();
