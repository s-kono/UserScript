// ==UserScript==
// @name           kb.vmware.com_CSVmod
// @description    knowledge.broadcom.com: fix Article margin
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/kb.vmware.com_CSVmod.user.js
// @updateURL      https://github.com/s-kono/UserScript/raw/main/kb.vmware.com_CSVmod.user.js
// @version        0.20250822.0
// @match          https://knowledge.broadcom.com/external/article/*
// @match          https://web.archive.org/web/*/https://kb.vmware.com/s/article/*
// @icon           https://www.broadcom.com/favicon.png
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function() {
    'use strict';
    const css = `
.cKM_ArticleThemeLayout #contentContainer {
    margin:  0 !important;
}
    `;
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    // https://knowledge.broadcom.com/external/article/* : Refused to load the image 'https://www.broadcom.com/favicon.png' because it violates the following Content Security Policy directive: "img-src 'self'
    const favicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAA3NCSVQICAjb4U/gAAAFQElEQVRIiZ1WW2wUZRT+zvwzO7OzdGe33bYs9LrQCyW9EMCCgSghEG00SIISQgTlgZAYDWiivhlfvCUGjdEQHvD2YEQTJCQlgQe8RVKsUKFtWtDaAoItpdvdurM73Z05Puz2unS38bzsv7v/f77v/8853zmEnCYTVZBa76gN5C6FopEAkGB7GMlejvdJ1k22Usw5PNBCf+iQWuHZTkYTdD+EStK8DRY7YdhXYZ7jSAdiJpzFAhCwHp5nKbAWerbfbLPY+Q3mlzz6K2LZdxHZxPeh6GVaWkOaTAveb7bJROXk2owlMqgfiSTmoMwB8EIcoaV7qEin+cB5TSNpDTwBkrtgWrMwZhzpkI7Q0h3wicURzzaJqA6aj+ROxKbvkQEgYB+K9lBRbu/kUknIsO0FNxCthDYJpwtmBjX9sR6evVSU69HZUZvryk8dLT91VG2uAz84ZwDIRHupaD08MzfQIb1CwRrScnBnIPjW4eJdj+krK6G6Iqcv0MJsNJIKIf+AiSRYAtAKz1roObwDkH2Gp2VVeu1pWSX7jNz710JvhQeAJBNtJyNPvrMjVwWVspL0N6WsRK4K5nglACpJ28mQiaQKUpvy0Wc4rlC54s+wVvyGK1TOC5TutDVBryBVqndUf1a5ZZtWX01iKuWE0Oqr8x7xQ9Q7qtRA7rx6QKRojTUAJkfHJkfHAGiNNURK7lMqSQ3klkqRZx8AYRTodSEA0c7uaGc3AL0uJIyCvAdLoUhaXlWYFeFEZ0+isweLizMAjUR+sWQ4ak2l4jfYthPXbsS7+tm2Fb+h1lTmjTMAKcEL1v0MkcYaEiIZjlg3hiYHbiXDERIiHZXclmBbHkZyiqrDcAgS5sacSNEbawEkb4+kBu+mF65Aod5YS6RgrjjPczKMpNzL8RRY9RlyVZA01R4eSw7+DbanYURxoVpbBcDsH7AjE8yO2T/gaalXa6tEcaF97/60a5BQqitEaSEnrNTgXWs80stxuU+ynJd2r9z/jKtqmeRSkvfC0Qsdo8e/SXRcTdNRQstdwWIAiWs3mJPpBXbDFSxWQstTI8NpvtqGlsDBp71bWpVivzOZnBy80/3Fyb4P35ZvsvXnuhUbWuozfCvd2nM7fU88MnLs6/Cnp51w1Ni5VfF5bTNudvWm95hdvbYZV3xeY+fWZN+g5Pf6n99Rcmi3K1CYcaK7lRbvHz0rbrJFAJ5sazvx4mvxn6/Y4xPebRuNbQ8L3c22bd0etsNRrbZS6O5ox9W/Hj9kR6IAhOGtPnvM29pkm/HE9SHh96plpSSEbcYj53+Jnr8ofAXuTWsOfPTumfZ2AuAm8R6Vb2QVgKR6Cp56tOTw/oJ1q6e1ITF0Z+iFN2PtP2UCw46nbXPlx29olcsy72/bE509Ix98PvHd944VA3CRrFf5VpztjKY/BM87VGaQDIA5JZeUGru26etWy35v/Prg+Fft1u/981JQba7z7Wlz11alwlGzsyfy7fnUyDCRDCDCqdf59iXEMD22EHAAgYNUMt3UmFOAIJKQLpRsvUqXMQlmB7DTrgGkmI/zyAmMpvN3Rif6kQiQXAct3aqIpEzPIsIDm9fU70REU/DMfAbjx3FvftMHkAR3wQyQEoIq/a/BIsV8EmOf8Mi/syRkjtJZ4EuICUIIqraImW62RTj1GY+eoPsxzNGe+VKaBF8m8zoniqEUQV7McGex8yMm3ud/ziIyb6xDjuHXC7EJS7aQtwHuwIOQLHZGkboC8xxHLlM8voBo5iHoJhEkpdlxryB19vg+BGuArW7E71Ay9/j+H4XCBMiNGkQ4AAAAAElFTkSuQmCC';
    const link = document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
})();

