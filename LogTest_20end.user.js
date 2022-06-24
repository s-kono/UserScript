// ==UserScript==
// @name           LogTest_20end
// @description    LogTest end
// @version        0.20180513.1
// @namespace      https://github.com/s-kono/UserScript
// @author         github.com/s-kono
// @match          <all_urls>
// @grant          none
// @run-at         document-end
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAREREA/wDrAOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiAAAgAAIAACICIiAiAgIgIgIiICICAiAiAiIgIgICICICIiAiAgIAIgIiICICAiIiAiIgIgICIiICIiAiAgIiIgIiICICAiIiAiIgAAIAACIiIiIiIiIiIiIiIiIiIiIhEREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// @updateURL      https://raw.githubusercontent.com/s-kono/UserScript/main/LogTest_20end.user.js
// @downloadURL    https://raw.githubusercontent.com/s-kono/UserScript/main/LogTest_20end.user.js
// ==/UserScript==

(function () {
    'use strict';
    var name = "LogTest_end";

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
